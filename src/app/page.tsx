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
  let qualPref = null;
  
  if (session?.user?.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { jobPreference: true, statePreference: true, qualificationPref: true }
    });
    if (dbUser) {
      jobPref = dbUser.jobPreference || "ALL";
      statePref = dbUser.statePreference;
      qualPref = dbUser.qualificationPref;
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

  if (qualPref && qualPref !== "Any Qualification") {
    whereClause.qualification = { contains: qualPref, mode: "insensitive" };
  }

  const jobs = await prisma.job.findMany({
    where: whereClause,
    orderBy: { postedAt: "desc" },
    take: 50, // Fetch more for the tables
  });

  // Mock jobs if database is empty for visual testing
  const displayJobs = jobs.length > 0 ? jobs : [
    {
      id: "1",
      title: "SSC CGL (Combined Graduate Level) Examination 2026",
      organization: "Staff Selection Commission (SSC)",
      type: "GOVERNMENT",
      category: "NEW_UPDATE",
      location: "All India",
      state: "Central",
      description: "Recruitment for various Group B and Group C posts in various Ministries/ Departments/ Organizations of Government of India.",
      salary: "₹47,600 - ₹1,51,100",
      deadline: new Date(Date.now() + 172800000), // 2 days from now
      qualification: "Graduation (Any Degree)",
    },
    {
      id: "2",
      title: "Senior Frontend Engineer (React/Next.js)",
      organization: "TechNova Solutions",
      type: "PRIVATE",
      category: "NEW_UPDATE",
      location: "Bangalore (Remote)",
      state: "Karnataka",
      description: "Looking for an experienced frontend engineer to lead the development of our flagship product.",
      salary: "₹18,00,000 - ₹25,00,000",
      deadline: new Date(Date.now() + 864000000), // 10 days
      qualification: "B.Tech / B.E.",
    },
    {
      id: "3",
      title: "IBPS PO (Probationary Officer) Admit Card Download",
      organization: "Institute of Banking Personnel Selection",
      type: "GOVERNMENT",
      category: "ADMIT_CARD",
      location: "All India",
      state: "Central",
      description: "Admit cards are now available for download.",
      salary: null,
      deadline: null,
      qualification: "Graduation (Any Degree)",
    },
    {
      id: "4",
      title: "UPSC Civil Services Prelims Result 2026",
      organization: "Union Public Service Commission",
      type: "GOVERNMENT",
      category: "RESULT",
      location: "All India",
      state: "Central",
      description: "Results for the 2026 Civil Services Prelims.",
      salary: null,
      deadline: null,
      qualification: "Graduation (Any Degree)",
    }
  ];

  // Categorize jobs for the 3-column layout
  const newUpdates = displayJobs.filter(j => j.category === "NEW_UPDATE");
  const admitCards = displayJobs.filter(j => j.category === "ADMIT_CARD");
  const results = displayJobs.filter(j => j.category === "RESULT");

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
          <FeedPreferences initialJobPref={jobPref} initialStatePref={statePref} initialQualPref={qualPref} />
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
                <li key={job.id} style={{ borderBottom: "1px solid var(--border-color)", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }} className="hover:bg-white/5 transition-colors">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Link href={`/jobs/${job.id}`} style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-main)", textDecoration: "none" }}>
                      <span style={{ color: "var(--color-primary)", marginRight: "0.5rem" }}>▪</span>
                      {job.title}
                    </Link>
                    {job.deadline && (
                      <span style={{ fontSize: "0.75rem", fontWeight: 800, color: new Date(job.deadline).getTime() - Date.now() < 259200000 ? "#ef4444" : "var(--text-muted)", background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: "4px", whiteSpace: "nowrap" }}>
                        ⏱️ {Math.ceil((new Date(job.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} Days Left
                      </span>
                    )}
                  </div>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{ opacity: 0.7, fontSize: "0.85rem" }}>{job.organization}</span>
                      {job.qualification && (
                        <span style={{ fontSize: "0.7rem", background: "rgba(0, 229, 255, 0.15)", color: "var(--color-primary)", padding: "2px 8px", borderRadius: "12px", fontWeight: 700 }}>
                          🎓 {job.qualification}
                        </span>
                      )}
                    </div>
                    <Link href={`/jobs/${job.id}`} className="btn btn-primary" style={{ padding: "0.3rem 0.8rem", fontSize: "0.75rem", borderRadius: "6px" }}>
                      View
                    </Link>
                  </div>
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
                <li key={job.id} style={{ borderBottom: "1px solid var(--border-color)", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }} className="hover:bg-white/5 transition-colors">
                  <Link href={`/jobs/${job.id}`} style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-main)", textDecoration: "none" }}>
                    <span style={{ color: "var(--color-secondary)", marginRight: "0.5rem" }}>▪</span>
                    {job.title}
                  </Link>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ opacity: 0.7, fontSize: "0.85rem" }}>{job.organization}</span>
                    <Link href={job.applyUrl || `/jobs/${job.id}`} target="_blank" className="btn btn-secondary" style={{ padding: "0.3rem 0.8rem", fontSize: "0.75rem", borderRadius: "6px" }}>
                      Download
                    </Link>
                  </div>
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
                <li key={job.id} style={{ borderBottom: "1px solid var(--border-color)", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }} className="hover:bg-white/5 transition-colors">
                  <Link href={`/jobs/${job.id}`} style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-main)", textDecoration: "none" }}>
                    <span style={{ color: "#f59e0b", marginRight: "0.5rem" }}>▪</span>
                    {job.title}
                  </Link>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ opacity: 0.7, fontSize: "0.85rem" }}>{job.organization}</span>
                    <Link href={job.applyUrl || `/jobs/${job.id}`} target="_blank" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b", border: "1px solid rgba(245, 158, 11, 0.3)", padding: "0.3rem 0.8rem", fontSize: "0.75rem", borderRadius: "6px", fontWeight: 700 }}>
                      Check Result
                    </Link>
                  </div>
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
