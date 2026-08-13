import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export const revalidate = 60; // Cache page for 60 seconds (eliminates DB lag)

export default async function JobsPage(props: { searchParams: Promise<{ q?: string, type?: string, location?: string, sort?: string, state?: string }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || "";
  const typeFilter = searchParams?.type || "ALL";
  const locationFilter = searchParams?.location || "ALL";
  const stateFilter = searchParams?.state || "ALL";
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

  if (stateFilter !== "ALL") {
    whereClause.OR = whereClause.OR ? [...whereClause.OR, { state: stateFilter }, { state: "Central" }] : [{ state: stateFilter }, { state: "Central" }, { state: null }];
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
    <main style={{ background: "#fff", color: "#000", fontFamily: "Arial, sans-serif", padding: "20px 0" }}>
      <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 15px" }}>
        
        <div style={{ background: "#004085", color: "#fff", padding: "12px", textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "20px", margin: 0, fontWeight: "bold", textTransform: "uppercase" }}>
            Government & Private Job Search Engine
          </h1>
        </div>

        {/* Filter Bar */}
        <div style={{ background: "#f8f9fa", padding: "15px", border: "1px solid #dee2e6", marginBottom: "20px" }}>
          <form action="/jobs" method="GET" style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <input 
              type="text" 
              name="q" 
              defaultValue={query}
              placeholder="Search by Keyword (SSC, Bank, Delhi...)"
              style={{ flex: "1 1 250px", padding: "8px 12px", border: "1px solid #ccc", fontSize: "14px" }}
            />
            
            <select name="type" defaultValue={typeFilter} style={{ padding: "8px", border: "1px solid #ccc", fontSize: "14px" }}>
              <option value="ALL">All Types</option>
              <option value="GOVERNMENT">Government Jobs</option>
              <option value="PRIVATE">Private Jobs</option>
            </select>

            <button type="submit" style={{ background: "#004085", color: "#fff", border: "none", padding: "8px 20px", fontWeight: "bold", cursor: "pointer" }}>
              Search Jobs 🔍
            </button>
          </form>
        </div>

        {/* Results Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h2 style={{ fontSize: "16px", color: "#004085", margin: 0 }}>
            Found {jobs.length} Matching Jobs
          </h2>
          <Link href="/jobs" style={{ color: "#cc0000", fontWeight: "bold", textDecoration: "none", fontSize: "13px" }}>
            Reset Filters
          </Link>
        </div>

        {/* Job Table */}
        {jobs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", border: "1px solid #dee2e6", background: "#f8f9fa" }}>
            <p style={{ color: "#666", fontSize: "16px", marginBottom: "10px" }}>No matching jobs found for your search.</p>
            <Link href="/jobs" style={{ background: "#004085", color: "#fff", padding: "8px 15px", fontWeight: "bold", textDecoration: "none", display: "inline-block" }}>
              View All Notifications
            </Link>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #004085" }}>
            <thead>
              <tr style={{ background: "#004085", color: "#fff" }}>
                <th style={{ padding: "10px", border: "1px solid #004085", textAlign: "left", fontSize: "14px" }}>Job Title & Organization</th>
                <th style={{ padding: "10px", border: "1px solid #004085", textAlign: "center", fontSize: "14px", width: "130px" }}>Qualification</th>
                <th style={{ padding: "10px", border: "1px solid #004085", textAlign: "center", fontSize: "14px", width: "130px" }}>Location</th>
                <th style={{ padding: "10px", border: "1px solid #004085", textAlign: "center", fontSize: "14px", width: "110px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, idx) => (
                <tr key={job.id} style={{ background: idx % 2 === 0 ? "#fff" : "#f8f9fa" }}>
                  <td style={{ border: "1px solid #dee2e6", padding: "10px", fontSize: "14px" }}>
                    <Link href={`/jobs/${job.id}`} style={{ color: "#004085", fontWeight: "bold", textDecoration: "none", display: "block" }}>
                      {job.title}
                    </Link>
                    <span style={{ fontSize: "12px", color: "#555" }}>
                      {job.organization}
                    </span>
                  </td>
                  <td style={{ border: "1px solid #dee2e6", padding: "10px", textAlign: "center", fontSize: "13px" }}>
                    {job.qualification || "Check Notice"}
                  </td>
                  <td style={{ border: "1px solid #dee2e6", padding: "10px", textAlign: "center", fontSize: "13px" }}>
                    {job.state || job.location || "Central"}
                  </td>
                  <td style={{ border: "1px solid #dee2e6", padding: "10px", textAlign: "center" }}>
                    <Link href={`/jobs/${job.id}`} style={{ background: "#28a745", color: "#fff", padding: "5px 10px", fontWeight: "bold", textDecoration: "none", borderRadius: "3px", fontSize: "12px", display: "inline-block" }}>
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </main>
  );
}
