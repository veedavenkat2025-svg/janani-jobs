import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AuthButton } from "./AuthButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="glass-nav" style={{ padding: "1rem 0" }}>
      <div className="container flex justify-between items-center">
        <Link href="/" className="nav-brand text-gradient" style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-1px" }}>
          Janani Jobs
        </Link>
        <div className="flex gap-2 items-center" style={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Link href="/jobs" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "none" }}>
            Browse Jobs
          </Link>
          <Link href="/govt-exams" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "none", color: "var(--color-primary)", fontWeight: 600 }}>
            Govt Exams
          </Link>
          <Link href="/career-paths" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "none", color: "var(--color-primary)", fontWeight: 600 }}>
            Career Paths
          </Link>
          <Link href="/career-finder" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "none", color: "var(--color-primary)", fontWeight: 600 }}>
            Career Finder
          </Link>
          <Link href="/learn" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "none" }}>
            Free Learning
          </Link>
          <Link href="/scholarships" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "none" }}>
            Scholarships
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
