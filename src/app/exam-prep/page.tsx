import Link from "next/link";

export default function ExamPrepPage() {
  return (
    <main className="container" style={{ padding: "4rem 0" }}>
      <header style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 className="text-gradient" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Exam Preparation Center
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto" }}>
          Access curated syllabus, previous year papers, and mock tests for top Government Examinations.
        </p>
      </header>

      <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        
        {/* UPSC Card */}
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>UPSC Civil Services</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Comprehensive resources for IAS, IPS, and IFS aspirants. Includes Prelims & Mains strategy.
          </p>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li>📄 <a href="#" style={{ color: "var(--color-primary)" }}>Download 2026 Syllabus</a></li>
            <li>📚 <a href="#" style={{ color: "var(--color-primary)" }}>Previous Year Question Papers</a></li>
            <li>📝 <a href="#" style={{ color: "var(--color-primary)" }}>Free Mock Test Series</a></li>
          </ul>
          <button className="btn btn-primary" style={{ width: "100%" }}>Start Preparation</button>
        </div>

        {/* Banking Card */}
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Banking (IBPS & SBI)</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Master Quantitative Aptitude, Reasoning, and General Awareness for PO and Clerk exams.
          </p>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li>📄 <a href="#" style={{ color: "var(--color-primary)" }}>Download Latest Syllabus</a></li>
            <li>📚 <a href="#" style={{ color: "var(--color-primary)" }}>Topic-wise Practice Sets</a></li>
            <li>📝 <a href="#" style={{ color: "var(--color-primary)" }}>Speed & Accuracy Tests</a></li>
          </ul>
          <button className="btn btn-primary" style={{ width: "100%" }}>Start Preparation</button>
        </div>

        {/* SSC Card */}
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>SSC CGL & CHSL</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Target Tier I & Tier II with our expert-curated mock exams and quick revision notes.
          </p>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li>📄 <a href="#" style={{ color: "var(--color-primary)" }}>Complete Pattern Guide</a></li>
            <li>📚 <a href="#" style={{ color: "var(--color-primary)" }}>English & Math Formula Book</a></li>
            <li>📝 <a href="#" style={{ color: "var(--color-primary)" }}>Weekly Live Mocks</a></li>
          </ul>
          <button className="btn btn-primary" style={{ width: "100%" }}>Start Preparation</button>
        </div>

      </div>
    </main>
  );
}
