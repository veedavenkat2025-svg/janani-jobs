export default function LearnPage() {
  return (
    <main className="container" style={{ padding: "4rem 0", maxWidth: "1000px" }}>
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 className="text-gradient" style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
          Free Learning Resources
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", maxWidth: "700px", margin: "0 auto" }}>
          High-quality education should be free. Here are the best curated free resources for government exam prep, coding, and communication skills.
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
        
        {/* Govt Prep */}
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--color-primary)" }}>📚 Govt Exam Prep</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <li style={{ padding: "1rem", background: "var(--bg-subtle)", borderRadius: "8px" }}>
              <strong>Unacademy / Byju's Free YouTube</strong><br/>
              <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Search YouTube for full free playlists on SSC/UPSC.</span>
            </li>
            <li style={{ padding: "1rem", background: "var(--bg-subtle)", borderRadius: "8px" }}>
              <strong>NCERT Official Site</strong><br/>
              <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Free PDFs of all school textbooks (essential for UPSC).</span><br/>
              <a href="https://ncert.nic.in" target="_blank" className="btn btn-secondary" style={{ marginTop: "0.5rem", padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}>ncert.nic.in</a>
            </li>
          </ul>
        </div>

        {/* Tech Skills */}
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--color-secondary)" }}>💻 Coding & Tech Skills</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <li style={{ padding: "1rem", background: "var(--bg-subtle)", borderRadius: "8px" }}>
              <strong>freeCodeCamp.org</strong><br/>
              <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Learn to code completely free with interactive tutorials.</span><br/>
              <a href="https://freecodecamp.org" target="_blank" className="btn btn-secondary" style={{ marginTop: "0.5rem", padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}>freecodecamp.org</a>
            </li>
            <li style={{ padding: "1rem", background: "var(--bg-subtle)", borderRadius: "8px" }}>
              <strong>CS50 by Harvard</strong><br/>
              <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>The world's best free intro to computer science (YouTube/edX).</span>
            </li>
          </ul>
        </div>

        {/* Soft Skills */}
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#f59e0b" }}>🗣️ English & Soft Skills</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <li style={{ padding: "1rem", background: "var(--bg-subtle)", borderRadius: "8px" }}>
              <strong>Duolingo</strong><br/>
              <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Free app to practice basic English grammar and vocabulary.</span>
            </li>
            <li style={{ padding: "1rem", background: "var(--bg-subtle)", borderRadius: "8px" }}>
              <strong>BBC Learning English</strong><br/>
              <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Excellent free videos and audios for intermediate speakers.</span>
            </li>
          </ul>
        </div>

      </div>
    </main>
  );
}
