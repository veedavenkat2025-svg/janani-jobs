import Link from "next/link";
import { prisma } from "@/lib/prisma";

// This is a Server Component, we can fetch data directly!
export default async function Home() {
  const jobs = await prisma.job.findMany({
    orderBy: { postedAt: "desc" },
    take: 10,
  });

  // Mock jobs if database is empty for visual testing
  const displayJobs = jobs.length > 0 ? jobs : [
    {
      id: "1",
      title: "SSC CGL (Combined Graduate Level) Examination 2026",
      organization: "Staff Selection Commission (SSC)",
      type: "GOVERNMENT",
      location: "All India",
      description: "Recruitment for various Group B and Group C posts in various Ministries/ Departments/ Organizations of Government of India.",
      salary: "₹47,600 - ₹1,51,100",
      deadline: new Date("2026-09-15"),
    },
    {
      id: "2",
      title: "Senior Frontend Engineer (React/Next.js)",
      organization: "TechNova Solutions",
      type: "PRIVATE",
      location: "Bangalore (Remote)",
      description: "Looking for an experienced frontend engineer to lead the development of our flagship product.",
      salary: "₹18,00,000 - ₹25,00,000",
      deadline: new Date("2026-08-30"),
    },
    {
      id: "3",
      title: "IBPS PO (Probationary Officer) - 2026",
      organization: "Institute of Banking Personnel Selection",
      type: "GOVERNMENT",
      location: "All India",
      description: "Recruitment of Probationary Officers/ Management Trainees in Participating Banks.",
      salary: "₹52,000 - ₹55,000",
      deadline: new Date("2026-10-01"),
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section style={{ padding: "4rem 0 6rem 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        
        {/* Animated Background Elements */}
        <div style={{ position: "absolute", top: "10%", left: "20%", width: "300px", height: "300px", background: "var(--color-primary)", filter: "blur(100px)", opacity: 0.15, borderRadius: "50%", zIndex: -1 }} className="animate-float"></div>
        <div style={{ position: "absolute", bottom: "10%", right: "20%", width: "250px", height: "250px", background: "var(--color-secondary)", filter: "blur(100px)", opacity: 0.15, borderRadius: "50%", zIndex: -1, animationDelay: "2s" }} className="animate-float"></div>

        <div className="container">
          <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)", marginBottom: "1.5rem", fontWeight: 800, lineHeight: 1.1 }}>
            Find Your <span className="text-gradient">Dream Job</span><br/> in India Today.
          </h1>
          <p style={{ fontSize: "clamp(1rem, 4vw, 1.25rem)", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto 3rem auto" }}>
            The ultimate platform for Sarkari Naukri, Private Sector Roles, and Career Guidance. Curated specifically for the youth.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/jobs" className="btn btn-primary pulse-button" style={{ padding: "1rem 2rem", fontSize: "1.125rem", minWidth: "200px" }}>
              Explore Jobs Now
            </Link>
            <Link href="/career-paths" className="btn btn-secondary" style={{ padding: "1rem 2rem", fontSize: "1.125rem", minWidth: "200px" }}>
              Career Paths
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions / Featured Categories */}
      <section className="container" style={{ padding: "2rem 0" }}>
        <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem, 5vw, 2.5rem)", marginBottom: "3rem" }}>Why Choose <span className="text-gradient">Janani Jobs?</span></h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          
          <div className="card" style={{ textAlign: "center", borderBottom: "4px solid var(--color-primary)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--color-primary)" }}>🏛️ Live Govt Jobs</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>Auto-updating database of SSC, UPSC, and Banking jobs directly from official portals.</p>
            <Link href="/govt-exams" className="btn btn-secondary" style={{ width: "100%", borderRadius: "10px" }}>View Govt Exams</Link>
          </div>
          
          <div className="card" style={{ textAlign: "center", borderBottom: "4px solid var(--color-secondary)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--color-secondary)" }}>✨ Career Finder</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>Take our interactive quiz to instantly find out what jobs and exams you qualify for.</p>
            <Link href="/career-finder" className="btn btn-secondary" style={{ width: "100%", borderRadius: "10px" }}>Take the Quiz</Link>
          </div>

          <div className="card" style={{ textAlign: "center", borderBottom: "4px solid #f59e0b" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#f59e0b" }}>📝 ATS Resume</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>Build a professional, ATS-friendly resume guaranteed to pass automated screening.</p>
            <Link href="/resume-builder" className="btn btn-secondary" style={{ width: "100%", borderRadius: "10px" }}>Build Resume</Link>
          </div>

        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="container" style={{ padding: "4rem 0" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)" }}>Latest Drops ⚡</h2>
          <Link href="/jobs" style={{ color: "var(--color-primary)", fontWeight: 800 }}>View All →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {displayJobs.map((job) => (
            <div key={job.id} className="card flex flex-col justify-between" style={{ minHeight: "220px", position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "100px",
                height: "100px",
                background: job.type === 'GOVERNMENT' ? "var(--color-primary)" : "var(--color-secondary)",
                filter: "blur(50px)",
                opacity: 0.1,
                zIndex: 0
              }}></div>

              <div style={{ zIndex: 1 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: "1rem" }}>
                  <span style={{ 
                    padding: "0.2rem 0.6rem",
                    borderRadius: "8px",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    background: job.type === 'GOVERNMENT' ? "rgba(0, 229, 255, 0.2)" : "rgba(112, 0, 255, 0.2)",
                    color: job.type === 'GOVERNMENT' ? "var(--color-primary)" : "#d1a3ff",
                    border: `1px solid ${job.type === 'GOVERNMENT' ? "rgba(0, 229, 255, 0.3)" : "rgba(112, 0, 255, 0.3)"}`
                  }}>
                    {job.type === 'GOVERNMENT' ? '🏛️ Govt' : '🚀 Private'}
                  </span>
                </div>
                
                <h3 style={{ fontSize: "1.3rem", marginBottom: "0.4rem", fontWeight: 800 }}>{job.title}</h3>
                <p style={{ color: "var(--text-muted)", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.8rem" }}>
                  @{job.organization}
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.2rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {job.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between" style={{ marginTop: "auto", paddingTop: "0.8rem", borderTop: "1px solid var(--border-color)", zIndex: 1 }}>
                <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--color-primary)" }}>{job.salary || '💰 TBD'}</span>
                <Link href={`/jobs/${job.id}`} className="btn btn-primary" style={{ padding: "0.4rem 1.2rem", fontSize: "0.85rem", borderRadius: "10px" }}>
                  Check it
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
