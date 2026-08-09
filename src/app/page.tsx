import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function Home({
  searchParams,
}: {
  searchParams: { state?: string, category?: string, qual?: string }
}) {
  const statePref = searchParams.state || "All India";
  const categoryPref = searchParams.category || null;
  const qualPref = searchParams.qual || null;

  // Query database
  let whereClause: any = {};
  
  if (statePref && statePref !== "All India") {
    whereClause.OR = [
      { state: statePref },
      { state: "Central" },
      { state: null }
    ];
  }

  if (categoryPref) {
    whereClause.category = categoryPref;
  }

  if (qualPref && qualPref !== "Any Qualification") {
    whereClause.qualification = { contains: qualPref, mode: "insensitive" };
  }

  const jobs = await prisma.job.findMany({
    where: whereClause,
    orderBy: { postedAt: "desc" },
    take: 100, // Fetch lots of jobs for the dense tables
  });

  // Mock jobs if empty
  const displayJobs = jobs.length > 0 ? jobs : [
    {
      id: "1", title: "SSC CGL (Combined Graduate Level) Examination 2026", organization: "Staff Selection Commission", type: "GOVERNMENT", category: "NEW_UPDATE", location: "All India", state: "Central", deadline: new Date(Date.now() + 172800000), qualification: "Any Degree", applyUrl: "#"
    },
    {
      id: "2", title: "RRB NTPC Recruitment 2026", organization: "Railway Recruitment Board", type: "GOVERNMENT", category: "NEW_UPDATE", location: "All India", state: "Central", deadline: new Date(Date.now() + 864000000), qualification: "12th Pass / Degree", applyUrl: "#"
    },
    {
      id: "3", title: "IBPS PO Admit Card Download", organization: "Institute of Banking Personnel Selection", type: "GOVERNMENT", category: "ADMIT_CARD", location: "All India", state: "Central", deadline: null, qualification: "Any Degree", applyUrl: "#"
    },
    {
      id: "4", title: "UPSC Civil Services Prelims Result 2026", organization: "Union Public Service Commission", type: "GOVERNMENT", category: "RESULT", location: "All India", state: "Central", deadline: null, qualification: "Any Degree", applyUrl: "#"
    }
  ];

  const newUpdates = displayJobs.filter(j => j.category === "NEW_UPDATE");
  const admitCards = displayJobs.filter(j => j.category === "ADMIT_CARD");
  const results = displayJobs.filter(j => j.category === "RESULT");

  return (
    <main style={{ background: "#fff", color: "#000", fontFamily: "Arial, sans-serif" }}>
      
      {/* Top Dense Navigation (FreeJobAlert Style) */}
      <nav style={{ background: "#004085", padding: "10px", textAlign: "center" }}>
        <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
          <Link href="/" style={{ color: "#fff", fontWeight: "bold", padding: "5px 10px", background: "#002752", borderRadius: "4px", fontSize: "14px", textDecoration: "none" }}>Home</Link>
          <Link href="/?category=NEW_UPDATE" style={{ color: "#fff", fontWeight: "bold", padding: "5px 10px", fontSize: "14px", textDecoration: "none" }}>All India Govt Jobs</Link>
          <Link href="/?category=NEW_UPDATE" style={{ color: "#fff", fontWeight: "bold", padding: "5px 10px", fontSize: "14px", textDecoration: "none" }}>State Govt Jobs</Link>
          <Link href="/?category=NEW_UPDATE" style={{ color: "#fff", fontWeight: "bold", padding: "5px 10px", fontSize: "14px", textDecoration: "none" }}>Bank Jobs</Link>
          <Link href="/?category=NEW_UPDATE" style={{ color: "#fff", fontWeight: "bold", padding: "5px 10px", fontSize: "14px", textDecoration: "none" }}>Teaching Jobs</Link>
          <Link href="/?category=NEW_UPDATE" style={{ color: "#fff", fontWeight: "bold", padding: "5px 10px", fontSize: "14px", textDecoration: "none" }}>Engineering Jobs</Link>
          <Link href="/?category=NEW_UPDATE" style={{ color: "#fff", fontWeight: "bold", padding: "5px 10px", fontSize: "14px", textDecoration: "none" }}>Railway Jobs</Link>
          <Link href="/?category=NEW_UPDATE" style={{ color: "#fff", fontWeight: "bold", padding: "5px 10px", fontSize: "14px", textDecoration: "none" }}>Police/Defence Jobs</Link>
        </div>
      </nav>

      {/* Scrolling Marquee */}
      <div style={{ background: "#ffffcc", borderBottom: "1px solid #ffcc00", padding: "8px 0" }}>
        <marquee style={{ color: "#cc0000", fontWeight: "bold", fontSize: "14px" }} scrollamount="4">
          🔥 {newUpdates.map(j => `* ${j.title} (${j.organization}) * `).join(" | ")} 🔥
        </marquee>
      </div>

      <div className="container" style={{ display: "flex", gap: "20px", marginTop: "20px", paddingBottom: "40px" }}>
        
        {/* Left Sidebar - States (Classic) */}
        <aside style={{ width: "200px", flexShrink: 0, display: "none" }}>
           {/* Sidebar placeholder */}
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1 }}>
          
          {/* Filter Form */}
          <div style={{ background: "#f8f9fa", padding: "15px", border: "1px solid #dee2e6", marginBottom: "20px", textAlign: "center" }}>
             <form method="GET" action="/">
               <label style={{ fontWeight: "bold", marginRight: "10px", color: "#004085" }}>Filter Jobs:</label>
               <select name="state" defaultValue={statePref} style={{ padding: "5px", marginRight: "10px", border: "1px solid #ccc" }}>
                 <option value="All India">All India</option>
                 <option value="Andhra Pradesh">Andhra Pradesh</option>
                 <option value="Telangana">Telangana</option>
                 <option value="Uttar Pradesh">Uttar Pradesh</option>
                 <option value="Maharashtra">Maharashtra</option>
               </select>
               <select name="qual" defaultValue={qualPref || "Any Qualification"} style={{ padding: "5px", marginRight: "10px", border: "1px solid #ccc" }}>
                 <option value="Any Qualification">Any Qualification</option>
                 <option value="10th Pass">10th Pass</option>
                 <option value="12th Pass">12th Pass</option>
                 <option value="Any Degree">Any Degree</option>
                 <option value="B.Tech">B.Tech / B.E.</option>
               </select>
               <button type="submit" style={{ padding: "6px 15px", background: "#004085", color: "#fff", border: "none", fontWeight: "bold", cursor: "pointer" }}>Search</button>
             </form>
          </div>

          <h1 style={{ color: "#cc0000", textAlign: "center", fontSize: "24px", marginBottom: "20px", textTransform: "uppercase" }}>
            Latest Govt Jobs, Admit Cards & Results
          </h1>

          {/* 3-Column Tables */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "15px" }}>
            
            {/* Table 1: Latest Notifications */}
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #004085" }}>
              <thead>
                <tr>
                  <th style={{ background: "#004085", color: "#fff", padding: "10px", border: "1px solid #004085", fontSize: "16px" }}>
                    Latest Notifications
                  </th>
                </tr>
              </thead>
              <tbody>
                {newUpdates.map(job => (
                  <tr key={job.id}>
                    <td style={{ border: "1px solid #dee2e6", padding: "8px", fontSize: "14px" }}>
                      <Link href={`/jobs/${job.id}`} style={{ color: "#004085", fontWeight: "bold", textDecoration: "none", display: "block", marginBottom: "4px" }}>
                        {job.title}
                      </Link>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "5px", marginTop: "4px" }}>
                        <span style={{ fontSize: "12px", background: "#f8f9fa", padding: "2px 5px", border: "1px solid #ccc" }}>
                          {job.qualification || "Check Notification"}
                        </span>
                        {job.deadline && (
                           <span style={{ color: "#cc0000", fontWeight: "bold", fontSize: "12px" }}>
                             Last Date: {new Date(job.deadline).toLocaleDateString()}
                           </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={{ background: "#f8f9fa", textAlign: "center", padding: "10px", border: "1px solid #dee2e6" }}>
                    <Link href="/?category=NEW_UPDATE" style={{ color: "#cc0000", fontWeight: "bold", textDecoration: "none" }}>View All Notifications &gt;&gt;</Link>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Table 2: Admit Cards */}
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #004085" }}>
              <thead>
                <tr>
                  <th style={{ background: "#004085", color: "#fff", padding: "10px", border: "1px solid #004085", fontSize: "16px" }}>
                    Admit Cards
                  </th>
                </tr>
              </thead>
              <tbody>
                {admitCards.map(job => (
                  <tr key={job.id}>
                    <td style={{ border: "1px solid #dee2e6", padding: "8px", fontSize: "14px" }}>
                      <Link href={job.applyUrl || `/jobs/${job.id}`} target="_blank" style={{ color: "#004085", fontWeight: "bold", textDecoration: "none" }}>
                        {job.title}
                      </Link>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={{ background: "#f8f9fa", textAlign: "center", padding: "10px", border: "1px solid #dee2e6" }}>
                    <Link href="/?category=ADMIT_CARD" style={{ color: "#cc0000", fontWeight: "bold", textDecoration: "none" }}>View All Admit Cards &gt;&gt;</Link>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Table 3: Results */}
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #004085" }}>
              <thead>
                <tr>
                  <th style={{ background: "#004085", color: "#fff", padding: "10px", border: "1px solid #004085", fontSize: "16px" }}>
                    Results
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map(job => (
                  <tr key={job.id}>
                    <td style={{ border: "1px solid #dee2e6", padding: "8px", fontSize: "14px" }}>
                      <Link href={job.applyUrl || `/jobs/${job.id}`} target="_blank" style={{ color: "#004085", fontWeight: "bold", textDecoration: "none" }}>
                        {job.title}
                      </Link>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={{ background: "#f8f9fa", textAlign: "center", padding: "10px", border: "1px solid #dee2e6" }}>
                    <Link href="/?category=RESULT" style={{ color: "#cc0000", fontWeight: "bold", textDecoration: "none" }}>View All Results &gt;&gt;</Link>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </main>
  );
}
