"use client";

import { signIn, signOut } from "next-auth/react";

export function AuthButton({ session }: { session: any }) {
  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span style={{ fontWeight: 600, color: "var(--color-primary)" }}>
          {session.user?.name}
        </span>
        <button onClick={() => signOut()} className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn()} className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
      Sign In
    </button>
  );
}
