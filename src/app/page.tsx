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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          
          <div className="card animate-float" style={{ textAlign: "center", border: "1px solid var(--border-color)", background: "linear-gradient(180deg, rgba(0, 229, 255, 0.05) 0%, transparent 100%)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏛️</div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "var(--color-primary)" }}>Govt Jobs</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>SSC, UPSC, Banking & more. Verified daily.</p>
            <Link href="/govt-exams" className="btn btn-secondary" style={{ width: "100%", borderRadius: "12px" }}>Explore Now</Link>
          </div>
          
          <div className="card animate-float" style={{ textAlign: "center", border: "1px solid var(--border-color)", background: "linear-gradient(180deg, rgba(112, 0, 255, 0.05) 0%, transparent 100%)", animationDelay: "1s" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✨</div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "var(--color-secondary)" }}>Career Finder</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>Not sure where to start? Take the 2-min quiz.</p>
            <Link href="/career-finder" className="btn btn-secondary" style={{ width: "100%", borderRadius: "12px" }}>Start Quiz</Link>
          </div>

          <div className="card animate-float" style={{ textAlign: "center", border: "1px solid var(--border-color)", background: "linear-gradient(180deg, rgba(245, 158, 11, 0.05) 0%, transparent 100%)", animationDelay: "2s" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📝</div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#f59e0b" }}>Resume AI</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>Build a resume that actually gets you hired.</p>
            <Link href="/resume-builder" className="btn btn-secondary" style={{ width: "100%", borderRadius: "12px" }}>Build Yours</Link>
          </div>

        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="container" style={{ padding: "4rem 0" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)" }}>New Drops ⚡</h2>
          <Link href="/jobs" style={{ color: "var(--color-primary)", fontWeight: 800 }}>View All →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {displayJobs.map((job) => (
            <div key={job.id} className="card flex flex-col justify-between" style={{ minHeight: "240px", position: "relative", overflow: "hidden", padding: "1.25rem" }}>
              <div style={{
                position: "absolute",
                top: "-30px",
                right: "-30px",
                width: "120px",
                height: "120px",
                background: job.type === 'GOVERNMENT' ? "var(--color-primary)" : "var(--color-secondary)",
                filter: "blur(60px)",
                opacity: 0.1,
                zIndex: 0
              }}></div>

              <div style={{ zIndex: 1 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: "1.25rem" }}>
                  <span style={{ 
                    padding: "0.25rem 0.6rem",
                    borderRadius: "8px",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    background: job.type === 'GOVERNMENT' ? "rgba(0, 229, 255, 0.15)" : "rgba(112, 0, 255, 0.15)",
                    color: job.type === 'GOVERNMENT' ? "var(--color-primary)" : "#d1a3ff",
                    border: `1px solid ${job.type === 'GOVERNMENT' ? "rgba(0, 229, 255, 0.2)" : "rgba(112, 0, 255, 0.2)"}`
                  }}>
                    {job.type === 'GOVERNMENT' ? '🏛️ Govt' : '🚀 Private'}
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 700 }}>
                    #{job.id.slice(0, 4)}
                  </span>
                </div>
                
                <h3 style={{ fontSize: "1.4rem", marginBottom: "0.4rem", fontWeight: 800 }}>{job.title}</h3>
                <p style={{ color: "var(--text-muted)", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.8rem" }}>
                  @{job.organization}
                </p>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                   <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>📍 {job.location || 'India'}</span>
                   <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>🕒 Full-time</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between" style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--border-color)", zIndex: 1 }}>
                <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--color-primary)" }}>{job.salary || '💰 TBD'}</span>
                <Link href={`/jobs/${job.id}`} className="btn btn-primary" style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem", borderRadius: "10px", fontWeight: 800 }}>
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
