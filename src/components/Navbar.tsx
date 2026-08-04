import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AuthButton } from "./AuthButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <Link href="/" className="nav-brand text-gradient">
          Janani Jobs
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/jobs" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "none" }}>
            Browse Jobs
          </Link>
          <Link href="/exam-prep" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "none" }}>
            Exam Prep
          </Link>
          <Link href="/alerts" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "none" }}>
            Job Alerts
          </Link>
          <Link href="/resume-builder" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "none" }}>
            Resume Builder
          </Link>
          <AuthButton session={session} />
        </div>
      </div>
    </nav>
  );
}
