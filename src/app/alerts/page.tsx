import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function JobAlertsPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="container" style={{ padding: "4rem 0" }}>
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 className="text-gradient" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Job Alerts Dashboard
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto" }}>
          Never miss an opportunity. Get instant notifications when relevant govt or private jobs are posted.
        </p>
      </header>

      {!session ? (
        <div className="card" style={{ textAlign: "center", maxWidth: "500px", margin: "0 auto", padding: "3rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Authentication Required</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
            You must be signed in to configure and manage your personalized job alerts.
          </p>
          <Link href="/api/auth/signin" className="btn btn-primary" style={{ display: "inline-block" }}>
            Sign In to Subscribe
          </Link>
        </div>
      ) : (
        <div className="card" style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
          <h2 style={{ marginBottom: "1.5rem" }}>Your Subscriptions, {session.user?.name}</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="checkbox" defaultChecked style={{ width: "1.2rem", height: "1.2rem", accentColor: "var(--color-primary)" }} />
              <span style={{ fontWeight: 500 }}>All Central Government Jobs</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="checkbox" style={{ width: "1.2rem", height: "1.2rem", accentColor: "var(--color-primary)" }} />
              <span style={{ fontWeight: 500 }}>Banking & Finance Sector</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="checkbox" defaultChecked style={{ width: "1.2rem", height: "1.2rem", accentColor: "var(--color-primary)" }} />
              <span style={{ fontWeight: 500 }}>Defense & Police Departments</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="checkbox" style={{ width: "1.2rem", height: "1.2rem", accentColor: "var(--color-primary)" }} />
              <span style={{ fontWeight: 500 }}>Top Private IT & Tech Jobs</span>
            </label>
          </div>

          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Add Custom Keyword Alert</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input 
                type="text" 
                placeholder="e.g. Software Engineer, Clerk, UPSC" 
                style={{ flex: 1, padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}
              />
              <button className="btn btn-secondary">Add</button>
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: "100%" }}>Save Preferences</button>
        </div>
      )}
    </main>
  );
}
