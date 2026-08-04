import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { toggleSaveJob } from "../jobs/actions";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <main className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
        <h1>Access Denied</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Please sign in to view your profile and saved jobs.</p>
        <Link href="/api/auth/signin" className="btn btn-primary">Sign In</Link>
      </main>
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      savedJobs: {
        include: {
          job: true
        },
        orderBy: { savedAt: "desc" }
      }
    }
  });

  if (!user) return <p>User not found</p>;

  return (
    <main className="container" style={{ padding: "4rem 0" }}>
      <header className="card" style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "4rem" }}>
        {user.image ? (
          <img src={user.image} alt="Profile" style={{ width: "100px", height: "100px", borderRadius: "50%", border: "2px solid var(--color-primary)" }} />
        ) : (
          <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", color: "#000", fontWeight: "bold" }}>
            {user.name?.charAt(0) || "U"}
          </div>
        )}
        <div>
          <h1 className="text-gradient" style={{ fontSize: "2.5rem" }}>{user.name}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.25rem" }}>{user.email}</p>
          <span style={{ display: "inline-block", marginTop: "0.5rem", padding: "0.25rem 0.75rem", borderRadius: "20px", background: "var(--bg-subtle)", border: "1px solid var(--border-color)", fontSize: "0.875rem" }}>
            Role: {user.role}
          </span>
        </div>
      </header>

      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "2rem" }}>Saved Jobs</h2>
          <span style={{ color: "var(--text-muted)" }}>{user.savedJobs.length} Saved</span>
        </div>

        {user.savedJobs.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", marginBottom: "1rem" }}>You haven't saved any jobs yet.</p>
            <Link href="/jobs" className="btn btn-primary">Browse Jobs</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2rem" }}>
            {user.savedJobs.map(({ job }) => (
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
                </div>
                
                <div className="flex items-center justify-between" style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--border-color)" }}>
                  <form action={async () => {
                    "use server";
                    await toggleSaveJob(job.id);
                  }}>
                    <button type="submit" style={{ color: "var(--color-accent)", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}>
                      Remove
                    </button>
                  </form>
                  <Link href={`/jobs/${job.id}`} className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
