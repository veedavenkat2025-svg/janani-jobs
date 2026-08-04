"use client";

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function AuthButton({ session }: { session: any }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  if (session) {
    return (
      <div className="flex items-center gap-4" style={{ background: "rgba(255, 255, 255, 0.05)", padding: "0.25rem 0.5rem 0.25rem 1rem", borderRadius: "30px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <span style={{ fontWeight: 600, color: "var(--color-primary)", fontSize: "0.875rem" }}>
          {session.user?.name}
        </span>
        <button onClick={handleSignOut} className="btn" style={{ padding: "0.4rem 1rem", fontSize: "0.75rem", background: "rgba(255, 50, 50, 0.2)", color: "#ff4d4d", border: "1px solid rgba(255, 50, 50, 0.3)", borderRadius: "20px" }}>
          Log Out
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => router.push("/login")} className="btn btn-primary pulse-button" style={{ padding: "0.6rem 1.5rem", fontSize: "0.875rem", borderRadius: "30px" }}>
      Sign In
    </button>
  );
}
