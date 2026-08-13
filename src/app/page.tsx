import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import EligibilityCalculator from './components/EligibilityCalculator';

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
          <Link href="/?state=Andhra Pradesh" style={{ color: "#fff", fontWeight: "bold", padding: "5px 10px", fontSize: "14px", textDecoration: "none" }}>State Govt Jobs</Link>
          <Link href="/?category=NEW_UPDATE" style={{ color: "#fff", fontWeight: "bold", padding: "5px 10px", fontSize: "14px", textDecoration: "none" }}>Bank Jobs</Link>
          <Link href="/?category=NEW_UPDATE" style={{ color: "#fff", fontWeight: "bold", padding: "5px 10px", fontSize: "14px", textDecoration: "none" }}>Teaching Jobs</Link>
          <Link href="/?category=NEW_UPDATE" style={{ color: "#fff", fontWeight: "bold", padding: "5px 10px", fontSize: "14px", textDecoration: "none" }}>Engineering Jobs</Link>
          <Link href="/?category=NEW_UPDATE" style={{ color: "#fff", fontWeight: "bold", padding: "5px 10px", fontSize: "14px", textDecoration: "none" }}>Railway Jobs</Link>
          <Link href="/?category=NEW_UPDATE" style={{ color: "#fff", fontWeight: "bold", padding: "5px 10px", fontSize: "14px", textDecoration: "none" }}>Police/Defence Jobs</Link>
        </div>
      </nav>

      {/* Scrolling Marquee using CSS */}
      <div style={{ background: "#ffffcc", borderBottom: "1px solid #ffcc00", padding: "8px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div className="marquee-content" style={{ display: "inline-block" }}>
          <span style={{ color: "#cc0000", fontWeight: "bold", marginRight: "10px" }}>🔥 HOT UPDATES:</span>
          {newUpdates.map((j) => (
            <Link 
              key={j.id} 
              href={`/jobs/${j.id}`} 
              style={{ color: "#cc0000", fontWeight: "bold", fontSize: "14px", textDecoration: "none", marginRight: "20px" }}
            >
              * {j.title} ({j.organization}) *
            </Link>
          ))}
          <span style={{ color: "#cc0000", fontWeight: "bold", marginLeft: "10px" }}>🔥</span>
        </div>
      </div>

      <div className="container classic-layout" style={{ paddingBottom: "40px" }}>
        
        {/* Left Sidebar - State Quick Links */}
        <aside className="sidebar-left">
          <div className="sidebar-box">
            <div className="sidebar-header">State Govt Jobs</div>
            <ul className="sidebar-links">
              <li><Link href="/?state=Andhra Pradesh">Andhra Pradesh</Link></li>
              <li><Link href="/?state=Telangana">Telangana</Link></li>
              <li><Link href="/?state=Uttar Pradesh">Uttar Pradesh</Link></li>
              <li><Link href="/?state=Maharashtra">Maharashtra</Link></li>
              <li><Link href="/?state=Delhi">Delhi</Link></li>
              <li><Link href="/?state=Bihar">Bihar</Link></li>
              <li><Link href="/?state=Karnataka">Karnataka</Link></li>
              <li><Link href="/?state=Tamil Nadu">Tamil Nadu</Link></li>
              <li><Link href="/?state=Kerala">Kerala</Link></li>
              <li><Link href="/?state=Rajasthan">Rajasthan</Link></li>
              <li><Link href="/?state=Madhya Pradesh">Madhya Pradesh</Link></li>
              <li><Link href="/?state=Central">View All States &gt;&gt;</Link></li>
            </ul>
          </div>
          <div className="sidebar-box">
            <div className="sidebar-header">Job Categories</div>
            <ul className="sidebar-links">
              <li><Link href="/?qual=10th Pass">10th Pass Jobs</Link></li>
              <li><Link href="/?qual=12th Pass">12th Pass Jobs</Link></li>
              <li><Link href="/?qual=Degree">Any Degree Jobs</Link></li>
              <li><Link href="/?qual=B.Tech">B.Tech / B.E. Jobs</Link></li>
              <li><Link href="/?qual=ITI">ITI / Diploma Jobs</Link></li>
            </ul>
          </div>
        </aside>

        {/* Main Center Content */}
        <div className="center-content">
          
          {/* Interactive Student Eligibility Calculator Widget */}
          <EligibilityCalculator />

          <h1 style={{ color: "#cc0000", textAlign: "center", fontSize: "20px", marginBottom: "15px", marginTop: 0, textTransform: "uppercase", textShadow: "1px 1px 0px #fff" }}>
            Latest Govt Jobs, Admit Cards & Results
          </h1>

          {/* Top Dense Table for Latest (Spanning full width of center) */}
          <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #004085", marginBottom: "15px" }}>
            <thead>
              <tr>
                <th style={{ background: "#004085", color: "#fff", padding: "8px", border: "1px solid #004085", fontSize: "15px", textAlign: "left" }}>
                  Hot Notifications 🔴
                </th>
              </tr>
            </thead>
            <tbody>
              {newUpdates.slice(0, 5).map((job, idx) => (
                <tr key={job.id} style={{ background: idx % 2 === 0 ? "#fff" : "#f8f9fa" }}>
                  <td style={{ border: "1px solid #dee2e6", padding: "8px", fontSize: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Link href={`/jobs/${job.id}`} style={{ color: "#004085", fontWeight: "bold", textDecoration: "none" }}>
                        {job.organization} - {job.title}
                      </Link>
                      <a 
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent('🔥 New Govt Job Alert: ' + job.title + '\nCheck eligibility & apply here: https://janani-jobs-beta.vercel.app/jobs/' + job.id)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ background: "#25D366", color: "#fff", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "3px" }}
                      >
                        📲 Share
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 3-Column Split for Admit Cards, Results, Notifications */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
            
            {/* Table: Admit Cards */}
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #004085" }}>
              <thead>
                <tr>
                  <th style={{ background: "#004085", color: "#fff", padding: "8px", border: "1px solid #004085", fontSize: "15px" }}>
                    Admit Cards
                  </th>
                </tr>
              </thead>
              <tbody>
                {admitCards.slice(0, 15).map((job, idx) => (
                  <tr key={job.id} style={{ background: idx % 2 === 0 ? "#fff" : "#f8f9fa" }}>
                    <td style={{ border: "1px solid #dee2e6", padding: "6px", fontSize: "13px" }}>
                      <Link href={job.applyUrl && job.applyUrl !== "#" ? job.applyUrl : `/jobs/${job.id}`} style={{ color: "#004085", textDecoration: "none", fontWeight: "bold" }}>
                        {job.title}
                      </Link>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={{ background: "#f8f9fa", textAlign: "right", padding: "8px", border: "1px solid #dee2e6" }}>
                    <Link href="/?category=ADMIT_CARD" style={{ color: "#cc0000", fontWeight: "bold", textDecoration: "none", fontSize: "12px" }}>View All &gt;&gt;</Link>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Table: Latest Notifications */}
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #004085" }}>
              <thead>
                <tr>
                  <th style={{ background: "#004085", color: "#fff", padding: "8px", border: "1px solid #004085", fontSize: "15px" }}>
                    Latest Updates
                  </th>
                </tr>
              </thead>
              <tbody>
                {newUpdates.slice(5, 20).map((job, idx) => (
                  <tr key={job.id} style={{ background: idx % 2 === 0 ? "#fff" : "#f8f9fa" }}>
                    <td style={{ border: "1px solid #dee2e6", padding: "6px", fontSize: "13px" }}>
                      <Link href={`/jobs/${job.id}`} style={{ color: "#004085", textDecoration: "none", fontWeight: "bold" }}>
                        {job.title}
                      </Link>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={{ background: "#f8f9fa", textAlign: "right", padding: "8px", border: "1px solid #dee2e6" }}>
                    <Link href="/?category=NEW_UPDATE" style={{ color: "#cc0000", fontWeight: "bold", textDecoration: "none", fontSize: "12px" }}>View All &gt;&gt;</Link>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Table: Results */}
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #004085" }}>
              <thead>
                <tr>
                  <th style={{ background: "#004085", color: "#fff", padding: "8px", border: "1px solid #004085", fontSize: "15px" }}>
                    Exam Results
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.slice(0, 15).map((job, idx) => (
                  <tr key={job.id} style={{ background: idx % 2 === 0 ? "#fff" : "#f8f9fa" }}>
                    <td style={{ border: "1px solid #dee2e6", padding: "6px", fontSize: "13px" }}>
                      <Link href={job.applyUrl && job.applyUrl !== "#" ? job.applyUrl : `/jobs/${job.id}`} style={{ color: "#004085", textDecoration: "none", fontWeight: "bold" }}>
                        {job.title}
                      </Link>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={{ background: "#f8f9fa", textAlign: "right", padding: "8px", border: "1px solid #dee2e6" }}>
                    <Link href="/?category=RESULT" style={{ color: "#cc0000", fontWeight: "bold", textDecoration: "none", fontSize: "12px" }}>View All &gt;&gt;</Link>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>

        {/* Right Sidebar - Resources */}
        <aside className="sidebar-right">
          <div className="sidebar-box">
            <div className="sidebar-header">Important Resources</div>
            <ul className="sidebar-links">
              <li><Link href="/?category=ADMIT_CARD">Answer Keys</Link></li>
              <li><Link href="/exam-prep">Syllabus</Link></li>
              <li><Link href="/exam-prep">Previous Papers</Link></li>
              <li><Link href="/exam-prep">Exam Pattern</Link></li>
              <li><Link href="/exam-prep">Current Affairs</Link></li>
              <li><Link href="/exam-prep/mock-test">Mock Tests 📝</Link></li>
              <li><Link href="/?category=NEW_UPDATE">Upcoming Exams</Link></li>
            </ul>
          </div>
          <div className="sidebar-box">
            <div className="sidebar-header">Stay Connected</div>
            <div style={{ padding: "10px", textAlign: "center", background: "#f8f9fa" }}>
              <p style={{ fontSize: "12px", marginBottom: "8px", color: "#333" }}>Download our Official App for instant Push Notifications!</p>
              <button style={{ background: "#28a745", color: "white", border: "none", padding: "8px 12px", fontWeight: "bold", borderRadius: "4px", width: "100%", cursor: "pointer" }}>Get Android App</button>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}
