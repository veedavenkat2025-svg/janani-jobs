import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const job = await prisma.job.findUnique({
    where: { id }
  });

  // Since we are mocking data on the homepage for visual testing, 
  // we will also mock it here if the ID matches the mock IDs.
  const mockJobs = [
    {
      id: "1",
      title: "SSC CGL (Combined Graduate Level) Examination 2026",
      organization: "Staff Selection Commission (SSC)",
      type: "GOVERNMENT",
      location: "All India",
      description: "Recruitment for various Group B and Group C posts in various Ministries/ Departments/ Organizations of Government of India. The examination will consist of a Computer Based Examination (Tier-I and Tier-II).",
      applyUrl: "https://ssc.nic.in",
      salary: "₹47,600 - ₹1,51,100",
      deadline: new Date("2026-09-15"),
      postedAt: new Date("2026-08-01")
    },
    {
      id: "2",
      title: "Senior Frontend Engineer (React/Next.js)",
      organization: "TechNova Solutions",
      type: "PRIVATE",
      location: "Bangalore (Remote)",
      description: "Looking for an experienced frontend engineer to lead the development of our flagship product. You will work with a modern tech stack (Next.js, TypeScript, Tailwind) and a highly talented team.",
      applyUrl: "https://technova.example.com/careers",
      salary: "₹18,00,000 - ₹25,00,000",
      deadline: new Date("2026-08-30"),
      postedAt: new Date("2026-08-02")
    },
    {
      id: "3",
      title: "IBPS PO (Probationary Officer) - 2026",
      organization: "Institute of Banking Personnel Selection",
      type: "GOVERNMENT",
      location: "All India",
      description: "Recruitment of Probationary Officers/ Management Trainees in Participating Banks. Preliminary and Main examinations will be conducted online.",
      applyUrl: "https://ibps.in",
      salary: "₹52,000 - ₹55,000",
      deadline: new Date("2026-10-01"),
      postedAt: new Date("2026-08-03")
    }
  ];

  const displayJob = job || mockJobs.find(j => j.id === id);

  if (!displayJob) {
    notFound();
  }

  return (
    <>
      <main className="container" style={{ padding: "4rem 0" }}>
        <Link href="/" style={{ color: "var(--color-primary)", fontWeight: 600, display: "inline-block", marginBottom: "2rem" }}>
          ← Back to Jobs
        </Link>
        
        <div className="card" style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: "1.5rem" }}>
            <span className={`badge ${displayJob.type === 'GOVERNMENT' ? 'badge-govt' : 'badge-private'}`} style={{ fontSize: "1rem", padding: "0.5rem 1rem" }}>
              {displayJob.type === 'GOVERNMENT' ? 'Govt Job' : 'Private Sector'}
            </span>
            <span style={{ color: "var(--text-muted)" }}>
              Posted: {displayJob.postedAt.toLocaleDateString()}
            </span>
          </div>

          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{displayJob.title}</h1>
          <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", fontWeight: 600, marginBottom: "2rem" }}>
            {displayJob.organization} • {displayJob.location || 'India'}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem", backgroundColor: "var(--bg-subtle)", padding: "1.5rem", borderRadius: "var(--radius-md)" }}>
            <div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Salary</p>
              <p style={{ fontSize: "1.125rem", fontWeight: 600 }}>{displayJob.salary || 'Not specified'}</p>
            </div>
            <div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Deadline</p>
              <p style={{ fontSize: "1.125rem", fontWeight: 600, color: displayJob.deadline ? "var(--color-secondary)" : "inherit" }}>
                {displayJob.deadline ? displayJob.deadline.toLocaleDateString() : 'Continuous'}
              </p>
            </div>
          </div>

          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Job Description</h2>
          <div style={{ lineHeight: "1.8", color: "var(--text-main)", marginBottom: "3rem", fontSize: "1.125rem" }}>
            {displayJob.description.split('\n').map((paragraph, idx) => (
              <p key={idx} style={{ marginBottom: "1rem" }}>{paragraph}</p>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "2rem", textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
              You will be redirected to the official {displayJob.type === 'GOVERNMENT' ? 'government' : 'company'} portal to complete your application.
            </p>
            <a href={displayJob.applyUrl || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "1rem 3rem", fontSize: "1.25rem", width: "100%", maxWidth: "400px" }}>
              Apply Now ↗
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
