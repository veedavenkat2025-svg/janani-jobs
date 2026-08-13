import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteJob } from "./actions";
import { updateUserRole, deleteUser } from "./user-actions";

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
        <h1 style={{ color: "var(--color-accent)" }}>Forbidden (403)</h1>
        <p style={{ color: "var(--text-muted)" }}>You do not have Administrator privileges.</p>
        <p style={{ fontSize: "0.875rem", marginTop: "1rem" }}>Current Role: <b>{dbUser?.role}</b></p>
      </main>
    );
  }

  // Fetch all jobs and users for the admin dashboard
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });
  const users = await prisma.user.findMany({ orderBy: { role: "asc" } });

  return (
    <main className="container" style={{ padding: "4rem 0" }}>
      <header style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: "2.5rem" }}>Admin Dashboard</h1>
          <p style={{ color: "var(--text-muted)" }}>Manage scraped jobs and registered users</p>
        </div>
        <div style={{ padding: "0.5rem 1rem", backgroundColor: "var(--bg-subtle)", borderRadius: "8px", color: "var(--color-primary)", fontWeight: "bold", border: "1px solid var(--border-color)" }}>
          Role: ADMIN
        </div>
      </header>

      {/* Quick Add Job Form */}
      <section style={{ marginBottom: "2rem", background: "#f8f9fa", padding: "20px", border: "1px solid #004085" }}>
        <h2 style={{ fontSize: "1.25rem", color: "#004085", marginTop: 0, marginBottom: "15px" }}>➕ Add New Job Notification</h2>
        <form action={async (formData: FormData) => {
          "use server";
          const title = formData.get("title") as string;
          const organization = formData.get("organization") as string;
          const type = (formData.get("type") as string) || "GOVERNMENT";
          const category = (formData.get("category") as string) || "NEW_UPDATE";
          const state = formData.get("state") as string;
          const qualification = formData.get("qualification") as string;
          const applyUrl = formData.get("applyUrl") as string;
          const description = formData.get("description") as string;

          if (title && organization) {
            await prisma.job.create({
              data: {
                title,
                organization,
                type,
                category,
                state,
                qualification,
                applyUrl,
                description: description || "Official notification details available.",
              }
            });
          }
        }} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold" }}>Job Title:</label>
            <input name="title" required placeholder="e.g. SSC CGL 2026 Notification" style={{ width: "100%", padding: "6px", fontSize: "13px" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold" }}>Organization:</label>
            <input name="organization" required placeholder="e.g. Staff Selection Commission" style={{ width: "100%", padding: "6px", fontSize: "13px" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold" }}>Category:</label>
            <select name="category" style={{ width: "100%", padding: "6px", fontSize: "13px" }}>
              <option value="NEW_UPDATE">Latest Notification</option>
              <option value="ADMIT_CARD">Admit Card</option>
              <option value="RESULT">Exam Result</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold" }}>State / Region:</label>
            <input name="state" placeholder="e.g. Central, Andhra Pradesh, Telangana" style={{ width: "100%", padding: "6px", fontSize: "13px" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold" }}>Qualification:</label>
            <input name="qualification" placeholder="e.g. Any Degree, 10th Pass, B.Tech" style={{ width: "100%", padding: "6px", fontSize: "13px" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold" }}>Apply URL:</label>
            <input name="applyUrl" placeholder="https://..." style={{ width: "100%", padding: "6px", fontSize: "13px" }} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold" }}>Brief Description:</label>
            <textarea name="description" rows={2} placeholder="Short details..." style={{ width: "100%", padding: "6px", fontSize: "13px" }} />
          </div>
          <button type="submit" style={{ background: "#28a745", color: "#fff", border: "none", padding: "8px 15px", fontWeight: "bold", cursor: "pointer", gridColumn: "1 / -1" }}>
            Publish Job Notification Now 🚀
          </button>
        </form>
      </section>

      {/* Users Management Section */}
      <section style={{ marginBottom: "4rem" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Users Management</h2>
        <div className="card" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-color)", background: "var(--bg-subtle)" }}>
                <th style={{ padding: "1rem" }}>User</th>
                <th style={{ padding: "1rem" }}>Email</th>
                <th style={{ padding: "1rem" }}>Role</th>
                <th style={{ padding: "1rem" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "1rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "1rem" }}>
                    {u.image ? (
                      <img src={u.image} alt="Avatar" style={{ width: "32px", height: "32px", borderRadius: "50%" }} />
                    ) : (
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "bold" }}>
                        {u.name?.charAt(0) || "U"}
                      </div>
                    )}
                    {u.name || "Unknown"}
                  </td>
                  <td style={{ padding: "1rem", color: "var(--text-muted)" }}>{u.email}</td>
                  <td style={{ padding: "1rem" }}>
                    <span style={{ 
                      padding: "0.25rem 0.75rem", 
                      borderRadius: "1rem", 
                      fontSize: "0.75rem", 
                      fontWeight: "bold",
                      backgroundColor: u.role === "ADMIN" ? "rgba(112, 0, 255, 0.15)" : "var(--bg-subtle)",
                      color: u.role === "ADMIN" ? "var(--color-secondary)" : "var(--text-main)",
                      border: `1px solid ${u.role === "ADMIN" ? "var(--color-secondary)" : "var(--border-color)"}`
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: "1rem", display: "flex", gap: "1rem" }}>
                    {u.email !== session.user?.email && (
                      <>
                        <form action={async () => {
                          "use server";
                          await updateUserRole(u.id, u.role === "ADMIN" ? "USER" : "ADMIN");
                        }}>
                          <button type="submit" className="btn btn-secondary" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}>
                            {u.role === "ADMIN" ? "Demote" : "Make Admin"}
                          </button>
                        </form>
                        <form action={async () => {
                          "use server";
                          await deleteUser(u.id);
                        }}>
                          <button type="submit" style={{ color: "var(--color-accent)", background: "none", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "0.875rem" }}>
                            Delete
                          </button>
                        </form>
                      </>
                    )}
                    {u.email === session.user?.email && (
                      <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>You</span>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Jobs Management Section */}
      <section>
        <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Scraped Jobs Management</h2>
        <div className="card" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-color)", background: "var(--bg-subtle)" }}>
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
                      <button type="submit" style={{ color: "var(--color-accent)", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}>
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
      </section>
    </main>
  );
}
