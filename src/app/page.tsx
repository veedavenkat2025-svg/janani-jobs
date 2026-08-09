import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FeedPreferences from "@/components/FeedPreferences";

export const revalidate = 0; // Dynamic route so preferences load fresh

// This is a Server Component, we can fetch data directly!
export default async function Home() {
  const session = await getServerSession(authOptions);
  
  let jobPref = "ALL";
  let statePref = null;
  
  if (session?.user?.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { jobPreference: true, statePreference: true }
    });
    if (dbUser) {
      jobPref = dbUser.jobPreference || "ALL";
      statePref = dbUser.statePreference;
    }
  }

  const whereClause: any = {};
  if (jobPref !== "ALL") {
    whereClause.type = jobPref;
  }
  
  // State logic: If statePref is set, we show jobs that are in that state OR 'Central' (All-India)
  if (statePref && statePref !== "All India") {
    whereClause.OR = [
      { state: statePref },
      { state: "Central" },
      { state: null } // Fallback for old jobs
    ];
  }

  const jobs = await prisma.job.findMany({
    where: whereClause,
    orderBy: { postedAt: "desc" },
    take: 50, // Fetch more for the tables
  });

  // Categorize jobs for the 3-column layout
  const newUpdates = jobs.filter(j => j.category === "NEW_UPDATE");
  const admitCards = jobs.filter(j => j.category === "ADMIT_CARD");
  const results = jobs.filter(j => j.category === "RESULT");

  return (
    <main>
      {/* Hero Section */}
      <section style={{ padding: "4rem 0 3rem 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "20%", width: "300px", height: "300px", background: "var(--color-primary)", filter: "blur(100px)", opacity: 0.15, borderRadius: "50%", zIndex: -1 }} className="animate-float"></div>
        <div style={{ position: "absolute", bottom: "10%", right: "20%", width: "250px", height: "250px", background: "var(--color-secondary)", filter: "blur(100px)", opacity: 0.15, borderRadius: "50%", zIndex: -1, animationDelay: "2s" }} className="animate-float"></div>

        <div className="container">
          <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)", marginBottom: "1.5rem", fontWeight: 800, lineHeight: 1.1 }}>
            Find Your <span className="text-gradient">Dream Job</span><br/> in India Today.
          </h1>
          <p style={{ fontSize: "clamp(1rem, 4vw, 1.25rem)", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto 3rem auto" }}>
            The ultimate platform for Sarkari Naukri, Private Sector Roles, and Career Guidance. Curated specifically for the youth.
          </p>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="container">
        {session ? (
          <FeedPreferences initialJobPref={jobPref} initialStatePref={statePref} />
        ) : (
          <div style={{ marginBottom: "2rem", padding: "1rem", background: "rgba(255,255,255,0.05)", borderRadius: "12px", textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              <Link href="/login" style={{ color: "var(--color-primary)", fontWeight: 700 }}>Log in</Link> to personalize this feed to your exact State and Job preference!
            </p>
          </div>
        )}
      </section>

      {/* FreeJobAlert Style 3-Column Layout */}
      <section className="container" style={{ padding: "1rem 0 4rem 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          
          {/* Column 1: New Updates */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ background: "var(--color-primary)", color: "#000", padding: "1rem", textAlign: "center", fontWeight: 800, fontSize: "1.2rem" }}>
              📢 Latest Notifications
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {newUpdates.length > 0 ? newUpdates.slice(0, 15).map(job => (
                <li key={job.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <Link href={`/jobs/${job.id}`} style={{ display: "block", padding: "0.8rem 1rem", fontSize: "0.95rem", color: "var(--text-main)", transition: "background 0.2s" }} className="hover:bg-white/5">
                    <span style={{ color: "var(--color-primary)", marginRight: "0.5rem" }}>▪</span>
                    {job.title} - <span style={{ opacity: 0.7, fontSize: "0.85rem" }}>{job.organization}</span>
                  </Link>
                </li>
              )) : (
                <li style={{ padding: "1rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.9rem" }}>No new updates found.</li>
              )}
            </ul>
            <div style={{ padding: "1rem", textAlign: "center", background: "rgba(0,0,0,0.2)" }}>
              <Link href="/jobs?category=NEW_UPDATE" style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "0.9rem" }}>View More Updates →</Link>
            </div>
          </div>

          {/* Column 2: Admit Cards */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ background: "var(--color-secondary)", color: "#000", padding: "1rem", textAlign: "center", fontWeight: 800, fontSize: "1.2rem" }}>
              🎫 Admit Cards
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {admitCards.length > 0 ? admitCards.slice(0, 15).map(job => (
                <li key={job.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <Link href={`/jobs/${job.id}`} style={{ display: "block", padding: "0.8rem 1rem", fontSize: "0.95rem", color: "var(--text-main)", transition: "background 0.2s" }} className="hover:bg-white/5">
                    <span style={{ color: "var(--color-secondary)", marginRight: "0.5rem" }}>▪</span>
                    {job.title} - <span style={{ opacity: 0.7, fontSize: "0.85rem" }}>{job.organization}</span>
                  </Link>
                </li>
              )) : (
                <li style={{ padding: "1rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.9rem" }}>No admit cards available.</li>
              )}
            </ul>
            <div style={{ padding: "1rem", textAlign: "center", background: "rgba(0,0,0,0.2)" }}>
              <Link href="/jobs?category=ADMIT_CARD" style={{ color: "var(--color-secondary)", fontWeight: 700, fontSize: "0.9rem" }}>View More Admit Cards →</Link>
            </div>
          </div>

          {/* Column 3: Results */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ background: "#f59e0b", color: "#000", padding: "1rem", textAlign: "center", fontWeight: 800, fontSize: "1.2rem" }}>
              🏆 Results
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {results.length > 0 ? results.slice(0, 15).map(job => (
                <li key={job.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <Link href={`/jobs/${job.id}`} style={{ display: "block", padding: "0.8rem 1rem", fontSize: "0.95rem", color: "var(--text-main)", transition: "background 0.2s" }} className="hover:bg-white/5">
                    <span style={{ color: "#f59e0b", marginRight: "0.5rem" }}>▪</span>
                    {job.title} - <span style={{ opacity: 0.7, fontSize: "0.85rem" }}>{job.organization}</span>
                  </Link>
                </li>
              )) : (
                <li style={{ padding: "1rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.9rem" }}>No results available.</li>
              )}
            </ul>
            <div style={{ padding: "1rem", textAlign: "center", background: "rgba(0,0,0,0.2)" }}>
              <Link href="/jobs?category=RESULT" style={{ color: "#f59e0b", fontWeight: 700, fontSize: "0.9rem" }}>View More Results →</Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}>
          ))}
        </div>
      </section>
    </main>
  );
}
