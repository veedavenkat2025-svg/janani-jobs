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
    <main style={{ background: "#fff", color: "#000", fontFamily: "Arial, sans-serif", padding: "20px 0" }}>
      <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 15px" }}>
        
        {/* Profile Card Header */}
        <div style={{ border: "1px solid #004085", background: "#fff", marginBottom: "20px" }}>
          <div style={{ background: "#004085", color: "#fff", padding: "12px", textAlign: "center", fontWeight: "bold", fontSize: "16px" }}>
            Student Profile Dashboard
          </div>
          <div style={{ padding: "20px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            {user.image ? (
              <img src={user.image} alt="Profile" style={{ width: "80px", height: "80px", borderRadius: "50%", border: "2px solid #004085" }} />
            ) : (
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#004085", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", color: "#fff", fontWeight: "bold" }}>
                {user.name?.charAt(0) || "U"}
              </div>
            )}
            <div>
              <h1 style={{ fontSize: "22px", margin: "0 0 5px 0", color: "#004085", fontWeight: "bold" }}>{user.name}</h1>
              <p style={{ color: "#666", fontSize: "14px", margin: "0 0 10px 0" }}>{user.email}</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ padding: "3px 10px", background: "#f0f8ff", border: "1px solid #004085", color: "#004085", fontSize: "12px", fontWeight: "bold", borderRadius: "3px" }}>
                  Role: {user.role}
                </span>
                {user.qualification && (
                  <span style={{ padding: "3px 10px", background: "#d4edda", border: "1px solid #28a745", color: "#155724", fontSize: "12px", fontWeight: "bold", borderRadius: "3px" }}>
                    🎓 {user.qualification}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Saved Jobs Section */}
        <div style={{ border: "1px solid #004085", background: "#fff" }}>
          <div style={{ background: "#004085", color: "#fff", padding: "10px 15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "15px", margin: 0, fontWeight: "bold" }}>Bookmarked & Saved Jobs</h2>
            <span style={{ fontSize: "12px", background: "#ffcc00", color: "#000", padding: "2px 8px", fontWeight: "bold", borderRadius: "3px" }}>
              {user.savedJobs.length} Saved
            </span>
          </div>

          {user.savedJobs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              <p style={{ fontSize: "14px", marginBottom: "15px" }}>You have not saved any job notifications yet.</p>
              <Link href="/" style={{ background: "#004085", color: "#fff", padding: "8px 18px", textDecoration: "none", fontWeight: "bold", borderRadius: "3px", fontSize: "13px" }}>
                Browse Latest Govt Jobs 🚀
              </Link>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
                  <th style={{ padding: "10px", textAlign: "left", fontSize: "13px" }}>Job Title</th>
                  <th style={{ padding: "10px", textAlign: "center", fontSize: "13px", width: "120px" }}>State</th>
                  <th style={{ padding: "10px", textAlign: "center", fontSize: "13px", width: "140px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {user.savedJobs.map(({ job }, idx) => (
                  <tr key={job.id} style={{ background: idx % 2 === 0 ? "#fff" : "#f8f9fa", borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "10px", fontSize: "13px" }}>
                      <Link href={`/jobs/${job.id}`} style={{ color: "#004085", fontWeight: "bold", textDecoration: "none" }}>
                        {job.title}
                      </Link>
                      <span style={{ display: "block", fontSize: "11px", color: "#666" }}>{job.organization}</span>
                    </td>
                    <td style={{ padding: "10px", textAlign: "center", fontSize: "12px" }}>
                      {job.state || "Central"}
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                        <Link href={`/jobs/${job.id}`} style={{ background: "#28a745", color: "#fff", padding: "4px 8px", borderRadius: "3px", fontSize: "11px", fontWeight: "bold", textDecoration: "none" }}>
                          View
                        </Link>
                        <form action={async () => {
                          "use server";
                          await toggleSaveJob(job.id);
                        }}>
                          <button type="submit" style={{ background: "#dc3545", color: "#fff", border: "none", padding: "4px 8px", borderRadius: "3px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>
                            Remove
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </main>
  );
}
