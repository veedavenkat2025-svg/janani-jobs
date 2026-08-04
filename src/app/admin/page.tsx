import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteJob } from "./actions";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return (
      <main className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
        <h1>Access Denied</h1>
        <p style={{ color: "var(--text-muted)" }}>You must be logged in.</p>
        <Link href="/api/auth/signin" className="btn btn-primary" style={{ marginTop: "1rem", display: "inline-block" }}>Sign In</Link>
      </main>
    );
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (dbUser?.role !== "ADMIN") {
    return (
      <main className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
        <h1 style={{ color: "red" }}>Forbidden (403)</h1>
        <p style={{ color: "var(--text-muted)" }}>You do not have Administrator privileges.</p>
        <p style={{ fontSize: "0.875rem", marginTop: "1rem" }}>Current Role: <b>{dbUser?.role}</b></p>
      </main>
    );
  }

  // Fetch all jobs for the admin table
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="container" style={{ padding: "4rem 0" }}>
      <header style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: "2.5rem" }}>Admin Dashboard</h1>
          <p style={{ color: "var(--text-muted)" }}>Manage scraped job postings</p>
        </div>
        <div style={{ padding: "0.5rem 1rem", backgroundColor: "rgba(16, 185, 129, 0.1)", borderRadius: "var(--radius-md)", color: "var(--color-primary)", fontWeight: "bold" }}>
          Role: ADMIN
        </div>
      </header>

      <div className="card" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border-color)" }}>
              <th style={{ padding: "1rem" }}>Title</th>
              <th style={{ padding: "1rem" }}>Organization</th>
              <th style={{ padding: "1rem" }}>Type</th>
              <th style={{ padding: "1rem" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                <td style={{ padding: "1rem", fontWeight: 500 }}>{job.title}</td>
                <td style={{ padding: "1rem", color: "var(--text-muted)" }}>{job.organization}</td>
                <td style={{ padding: "1rem" }}>
                  <span style={{ padding: "0.25rem 0.5rem", borderRadius: "1rem", fontSize: "0.75rem", backgroundColor: "var(--bg-subtle)" }}>
                    {job.type}
                  </span>
                </td>
                <td style={{ padding: "1rem" }}>
                  <form action={async () => {
                    "use server";
                    await deleteJob(job.id);
                  }}>
                    <button type="submit" style={{ color: "red", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}>
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                  No jobs found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
