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
        <div className="flex gap-4 items-center">
          <div className="hide-on-mobile flex gap-2">
            <Link href="/jobs" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "none" }}>
              Browse Jobs
            </Link>
            <Link href="/govt-exams" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "none", color: "var(--color-primary)", fontWeight: 600 }}>
              Govt Exams
            </Link>
            <Link href="/learn" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "none" }}>
              Free Learning
            </Link>
            <Link href="/resume-builder" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "none" }}>
              Resume Builder
            </Link>
          </div>

          <Link href="/notifications" className="btn btn-secondary" style={{ padding: "0.5rem", fontSize: "1rem", border: "none", position: "relative" }}>
            🔔
            <span style={{ position: "absolute", top: "0", right: "0", width: "8px", height: "8px", background: "var(--color-accent)", borderRadius: "50%" }}></span>
          </Link>
          <AuthButton session={session} />
        </div>
      </div>
    </nav>
  );
}
