import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function JobsPage({ searchParams }: { searchParams: { q?: string, type?: string } }) {
  const query = searchParams.q || "";
  const typeFilter = searchParams.type || "ALL";

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

  const jobs = await prisma.job.findMany({
    where: whereClause,
    orderBy: { postedAt: "desc" }
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
      <section className="card" style={{ marginBottom: "2rem", background: "var(--bg-subtle)", padding: "1rem" }}>
        <form action="/jobs" method="GET" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 250px" }}>
            <input 
              type="text" 
              name="q" 
              defaultValue={query}
              placeholder="Role, Skill or City..."
              style={{ width: "100%", padding: "0.85rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-main)", color: "var(--text-main)", fontSize: "1rem" }}
            />
          </div>
          
          <div style={{ flex: "1 1 120px" }}>
            <select 
              name="type" 
              defaultValue={typeFilter}
              style={{ width: "100%", padding: "0.85rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-main)", color: "var(--text-main)", fontSize: "1rem" }}
            >
              <option value="ALL">All Types</option>
              <option value="GOVERNMENT">Govt</option>
              <option value="PRIVATE">Private</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ flex: "1 1 100px" }}>
            Search
          </button>
        </form>
      </section>

      {/* Results */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2rem" }}>{jobs.length} Results Found</h2>
      </div>

      {jobs.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "4rem 0" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", marginBottom: "1rem" }}>No jobs match your search criteria.</p>
          <Link href="/jobs" className="btn btn-secondary">Clear Filters</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2rem" }}>
          {jobs.map((job) => (
            <div key={job.id} className="card flex flex-col justify-between" style={{ minHeight: "250px" }}>
              <div>
                <div className="flex items-center justify-between" style={{ marginBottom: "1rem" }}>
                  <span style={{ 
                    padding: "0.25rem 0.75rem", 
                    borderRadius: "20px", 
                    fontSize: "0.75rem", 
                    fontWeight: 600,
                    background: job.type === 'GOVERNMENT' ? "rgba(0, 229, 255, 0.1)" : "rgba(112, 0, 255, 0.1)",
                    color: job.type === 'GOVERNMENT' ? "var(--color-primary)" : "var(--color-secondary)",
                    border: `1px solid ${job.type === 'GOVERNMENT' ? "rgba(0, 229, 255, 0.3)" : "rgba(112, 0, 255, 0.3)"}`
                  }}>
                    {job.type === 'GOVERNMENT' ? 'Govt Job' : 'Private'}
                  </span>
                  {job.deadline && (
                    <span style={{ fontSize: "0.875rem", color: "var(--color-accent)", fontWeight: 600 }}>
                      Ends: {job.deadline.toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{job.title}</h3>
                <p style={{ color: "var(--text-muted)", fontWeight: 600, marginBottom: "1rem" }}>
                  {job.organization} • {job.location || 'India'}
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", marginBottom: "1.5rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {job.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between" style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--border-color)" }}>
                <span style={{ fontWeight: 600 }}>{job.salary || 'Not specified'}</span>
                <Link href={`/jobs/${job.id}`} className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
