"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/profile");
      router.refresh();
    }
  };

  return (
    <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      
      {/* Background Animated Orbs for Pro Vibe */}
      <div style={{ position: "absolute", top: "20%", left: "10%", width: "400px", height: "400px", background: "var(--color-primary)", filter: "blur(120px)", opacity: 0.15, borderRadius: "50%", zIndex: -1, pointerEvents: "none" }} className="animate-float"></div>
      <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "300px", height: "300px", background: "var(--color-secondary)", filter: "blur(120px)", opacity: 0.15, borderRadius: "50%", zIndex: -1, animationDelay: "2s", pointerEvents: "none" }} className="animate-float"></div>

      <div className="card" style={{ position: "relative", zIndex: 10, maxWidth: "450px", width: "100%", padding: "3rem", background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "24px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
        
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 className="text-gradient" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Welcome Back</h1>
          <p style={{ color: "var(--text-muted)" }}>Sign in to continue to Janani Jobs.</p>
        </div>

        {error && (
          <div style={{ padding: "1rem", background: "rgba(255, 0, 0, 0.1)", border: "1px solid rgba(255, 0, 0, 0.3)", color: "#ff4d4d", borderRadius: "8px", marginBottom: "1.5rem", textAlign: "center", fontSize: "0.875rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--text-muted)", fontWeight: 600 }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@janani.com"
              required
              style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.1)", background: "rgba(0, 0, 0, 0.5)", color: "#fff", fontSize: "1rem", outline: "none", transition: "border 0.2s" }}
              onFocus={(e) => e.target.style.borderColor = "var(--color-primary)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--text-muted)", fontWeight: 600 }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.1)", background: "rgba(0, 0, 0, 0.5)", color: "#fff", fontSize: "1rem", outline: "none", transition: "border 0.2s" }}
              onFocus={(e) => e.target.style.borderColor = "var(--color-primary)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary pulse-button" 
            disabled={loading}
            style={{ padding: "1rem", fontSize: "1.125rem", width: "100%", marginTop: "1rem", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "2rem", color: "var(--text-muted)", fontSize: "0.875rem" }}>
          Don't have an account? <Link href="/register" style={{ color: "var(--color-primary)", fontWeight: 600 }}>Sign up for free</Link>
        </p>
      </div>
    </main>
  );
}
