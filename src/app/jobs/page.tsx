import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export const revalidate = 60; // Cache page for 60 seconds (eliminates DB lag)

export default async function JobsPage(props: { searchParams: Promise<{ q?: string, type?: string, location?: string, sort?: string }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || "";
  const typeFilter = searchParams?.type || "ALL";
  const locationFilter = searchParams?.location || "ALL";
  const sortFilter = searchParams?.sort || "newest";

  // Build the Prisma query dynamically
  const whereClause: any = {};
  
  if (query) {
    whereClause.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { organization: { contains: query, mode: "insensitive" } },
      { location: { contains: query, mode: "insensitive" } },
    ];
  }

  if (typeFilter !== "ALL") {
    whereClause.type = typeFilter;
  }

  if (locationFilter === "Remote") {
    whereClause.location = { contains: "Remote", mode: "insensitive" };
  }

  const orderBy: any = {};
  if (sortFilter === "salary") {
    orderBy.salary = "desc";
  } else {
    orderBy.postedAt = "desc";
  }

  const jobs = await prisma.job.findMany({
    where: whereClause,
    orderBy: orderBy,
    take: 50, // Limits to top 50 to prevent backend memory crash on scale
  });

  return (
    <main className="container" style={{ padding: "2rem 0" }}>
      <header style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1 className="text-gradient" style={{ marginBottom: "0.5rem" }}>
          Find Your Vibe
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
          Fresh opportunities curated for the next generation.
        </p>
      </header>

      {/* Advanced Search & Filter Bar */}
      <section style={{ marginBottom: "2.5rem" }}>
        <form action="/jobs" method="GET" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <div style={{ flex: "1 1 300px", position: "relative" }}>
            <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }}>🔍</span>
            <input 
              type="text" 
              name="q" 
              defaultValue={query}
              placeholder="Design, Developer, Delhi..."
              style={{ width: "100%", padding: "1rem 1rem 1rem 2.8rem", borderRadius: "16px", border: "1px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-main)", fontSize: "1rem", outline: "none", transition: "border-color 0.3s" }}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ padding: "0 2rem", borderRadius: "16px" }}>
            Search
          </button>
        </form>

        {/* Dynamic Filter Pills */}
        <div className="pill-container">
          <Link href="/jobs" className={`pill ${typeFilter === 'ALL' && locationFilter === 'ALL' && sortFilter === 'newest' ? 'active' : ''}`}>All Roles</Link>
          <Link href="/jobs?type=GOVERNMENT" className={`pill ${typeFilter === 'GOVERNMENT' ? 'active' : ''}`}>🏛️ Govt Jobs</Link>
          <Link href="/jobs?type=PRIVATE" className={`pill ${typeFilter === 'PRIVATE' ? 'active' : ''}`}>🚀 Startups/Private</Link>
          <Link href="/jobs?location=Remote" className={`pill ${locationFilter === 'Remote' ? 'active' : ''}`}>📍 Remote</Link>
          <Link href="/jobs?sort=salary" className={`pill ${sortFilter === 'salary' ? 'active' : ''}`}>💰 High Salary</Link>
          <Link href="/jobs?sort=newest" className={`pill ${sortFilter === 'newest' && typeFilter === 'ALL' && locationFilter === 'ALL' ? 'active' : ''}`}>⚡ Newest</Link>
        </div>
      </section>

      {/* Results */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2rem" }}>{jobs.length} Results Found</h2>
      </div>

      {jobs.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "4rem 0" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", marginBottom: "1rem" }}>No jobs found. Try a different vibe?</p>
          <Link href="/jobs" className="btn btn-secondary">Clear Filters</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {jobs.map((job) => (
            <div key={job.id} className="card flex flex-col justify-between" style={{ minHeight: "240px", position: "relative", overflow: "hidden", padding: "1.25rem" }}>

              {/* Background Accent */}
              <div style={{
                position: "absolute",
                top: "-30px",
                left: "-30px",
                width: "120px",
                height: "120px",
                background: job.type === 'GOVERNMENT' ? "var(--color-primary)" : "var(--color-secondary)",
                filter: "blur(60px)",
                opacity: 0.1,
                zIndex: 0
              }}></div>

              <div style={{ zIndex: 1 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: "1.25rem" }}>
                  <div className="flex gap-2">
                    <span style={{
                      padding: "0.25rem 0.6rem",
                      borderRadius: "8px",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      background: job.type === 'GOVERNMENT' ? "rgba(0, 229, 255, 0.15)" : "rgba(112, 0, 255, 0.15)",
                      color: job.type === 'GOVERNMENT' ? "var(--color-primary)" : "#d1a3ff",
                      border: `1px solid ${job.type === 'GOVERNMENT' ? "rgba(0, 229, 255, 0.2)" : "rgba(112, 0, 255, 0.2)"}`
                    }}>
                      {job.type === 'GOVERNMENT' ? 'GOVT' : 'PRIVATE'}
                    </span>
                    <span style={{
                      padding: "0.25rem 0.6rem",
                      borderRadius: "8px",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      background: "rgba(255, 255, 255, 0.05)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border-color)"
                    }}>
                      {job.location === 'Remote' ? '☁️ Remote' : `📍 ${job.location || 'India'}`}
                    </span>
                  </div>
                  <button style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "1.2rem" }}>♡</button>
                </div>
                
                <h3 style={{ fontSize: "1.4rem", marginBottom: "0.4rem", fontWeight: 800, lineHeight: "1.2" }}>{job.title}</h3>
                <p style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1rem", opacity: 0.9 }}>
                  {job.organization}
                </p>

                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                  <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>📍 {job.location || 'India'}</span>
                  <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>🕒 Full-time</span>
                  {job.qualification && (
                    <span style={{ fontSize: "0.7rem", opacity: 0.7, color: "var(--color-primary)" }}>🎓 {job.qualification}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between" style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--border-color)", zIndex: 1 }}>
                <div>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 800, marginBottom: "2px" }}>Package</p>
                  <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#fff" }}>{job.salary || 'Best in Market'}</span>
                </div>
                <Link href={`/jobs/${job.id}`} className="btn btn-primary" style={{ padding: "0.6rem 1.5rem", fontSize: "0.9rem", borderRadius: "12px", fontWeight: 800 }}>
                  Apply →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
