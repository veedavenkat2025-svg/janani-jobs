import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { toggleSaveJob } from "../actions";
import Link from "next/link";

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({
    where: { id: params.id }
  });

  if (!job) notFound();

  const session = await getServerSession(authOptions);
  let isSaved = false;

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (user) {
      const saved = await prisma.savedJob.findUnique({
        where: {
          userId_jobId: { userId: user.id, jobId: job.id }
        }
      });
      isSaved = !!saved;
    }
  }

  return (
    <main className="container" style={{ padding: "4rem 0", maxWidth: "800px" }}>
      <Link href="/jobs" style={{ display: "inline-block", marginBottom: "2rem", color: "var(--text-muted)" }}>
        ← Back to all jobs
      </Link>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <span style={{ 
            padding: "0.25rem 0.75rem", 
            borderRadius: "20px", 
            fontSize: "0.875rem", 
            fontWeight: 600,
            background: job.type === 'GOVERNMENT' ? "rgba(0, 229, 255, 0.1)" : "rgba(112, 0, 255, 0.1)",
            color: job.type === 'GOVERNMENT' ? "var(--color-primary)" : "var(--color-secondary)",
            border: `1px solid ${job.type === 'GOVERNMENT' ? "rgba(0, 229, 255, 0.3)" : "rgba(112, 0, 255, 0.3)"}`
          }}>
            {job.type === 'GOVERNMENT' ? 'Government Job' : 'Private Sector'}
          </span>
          <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Posted: {job.postedAt.toLocaleDateString()}
          </span>
        </div>

        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{job.title}</h1>
        <h2 style={{ fontSize: "1.25rem", color: "var(--text-muted)", marginBottom: "2rem", fontWeight: 500 }}>
          {job.organization}
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem", padding: "1.5rem", background: "var(--bg-subtle)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
          <div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Location</p>
            <p style={{ fontWeight: 600 }}>{job.location || 'India'}</p>
          </div>
          <div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Salary</p>
            <p style={{ fontWeight: 600 }}>{job.salary || 'Not specified'}</p>
          </div>
          {job.deadline && (
            <div style={{ gridColumn: "span 2" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Application Deadline</p>
              <p style={{ fontWeight: 600, color: "var(--color-accent)" }}>{job.deadline.toLocaleDateString()}</p>
            </div>
          )}
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Job Description</h3>
          <p style={{ whiteSpace: "pre-wrap", color: "var(--text-muted)" }}>{job.description}</p>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.125rem", flex: 1, textAlign: "center" }}>
            Apply Now
          </a>
          
          <form action={async () => {
            "use server";
            await toggleSaveJob(job.id);
          }}>
            <button type="submit" className="btn btn-secondary" style={{ padding: "1rem 2rem", fontSize: "1.125rem" }}>
              {isSaved ? "★ Saved" : "☆ Save Job"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
