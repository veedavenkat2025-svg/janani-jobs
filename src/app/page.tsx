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
    <>
      <main className="container">
        {/* Hero Section */}
        <section style={{ padding: "6rem 0", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>
            Find Your Dream Career, <br/>
            <span className="text-gradient">Govt or Private.</span>
          </h1>
          <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", marginBottom: "2rem" }}>
            The unified platform for Indian job seekers. Get the latest Sarkari Naukri updates and top private sector opportunities all in one place.
          </p>
          <div className="flex justify-center gap-4">
            <button className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.125rem" }}>
              Explore Govt Jobs
            </button>
            <button className="btn btn-secondary" style={{ padding: "1rem 2rem", fontSize: "1.125rem" }}>
              Search Private Jobs
            </button>
          </div>
        </section>

        {/* Latest Jobs Section */}
        <section style={{ padding: "4rem 0" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "2rem" }}>Latest Opportunities</h2>
            <Link href="/jobs" style={{ color: "var(--color-primary)", fontWeight: 600 }}>View All →</Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2rem" }}>
            {displayJobs.map((job) => (
              <div key={job.id} className="card flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: "1rem" }}>
                    <span className={`badge ${job.type === 'GOVERNMENT' ? 'badge-govt' : 'badge-private'}`}>
                      {job.type === 'GOVERNMENT' ? 'Govt Job' : 'Private'}
                    </span>
                    {job.deadline && (
                      <span style={{ fontSize: "0.875rem", color: "var(--color-secondary)", fontWeight: 600 }}>
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
        </section>
      </main>
    </>
  );
}
