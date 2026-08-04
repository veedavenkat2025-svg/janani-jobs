import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import ResumeBuilderClient from "@/components/ResumeBuilderClient";

export default async function ResumeBuilderPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="container" style={{ padding: "4rem 0", maxWidth: "1400px" }}>
      <header className="hide-on-print" style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 className="text-gradient" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          ATS-Compliant Resume Builder
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto" }}>
          Build a resume guaranteed to pass Applicant Tracking System software.
        </p>
      </header>

      {!session ? (
        <div className="card hide-on-print" style={{ textAlign: "center", maxWidth: "500px", margin: "0 auto", padding: "3rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Authentication Required</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
            You must be signed in to use the ATS Resume Builder feature.
          </p>
          <Link href="/api/auth/signin" className="btn btn-primary" style={{ display: "inline-block" }}>
            Sign In to Build Resume
          </Link>
        </div>
      ) : (
        <ResumeBuilderClient userName={session.user?.name} userEmail={session.user?.email} />
      )}
    </main>
  );
}
