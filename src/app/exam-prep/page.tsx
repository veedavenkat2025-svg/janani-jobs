import Link from "next/link";

export default function ExamPrepPage() {
  return (
    <main style={{ background: "#fff", color: "#000", fontFamily: "Arial, sans-serif", padding: "20px 0" }}>
      <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 15px" }}>
        
        <div style={{ background: "#004085", color: "#fff", padding: "12px", textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "20px", margin: 0, fontWeight: "bold", textTransform: "uppercase" }}>
            Student Exam Preparation & Mock Test Center 📚
          </h1>
        </div>

        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          
          {/* UPSC Card */}
          <div style={{ border: "1px solid #004085", background: "#fff" }}>
            <div style={{ background: "#004085", color: "#fff", padding: "8px 12px", fontWeight: "bold", fontSize: "16px" }}>
              UPSC Civil Services
            </div>
            <div style={{ padding: "15px" }}>
              <p style={{ fontSize: "13px", color: "#555", marginBottom: "15px" }}>
                Comprehensive syllabus & past papers for IAS, IPS, and IFS aspirants.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 15px 0", fontSize: "13px", lineHeight: "1.8" }}>
                <li>📄 <a href="https://upsc.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#004085", fontWeight: "bold" }}>Download 2026 Syllabus</a></li>
                <li>📚 <a href="https://upsc.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#004085", fontWeight: "bold" }}>Previous Year Papers</a></li>
              </ul>
              <Link href="/exam-prep/mock-test" style={{ background: "#28a745", color: "#fff", padding: "8px", display: "block", textAlign: "center", fontWeight: "bold", textDecoration: "none", borderRadius: "3px", fontSize: "13px" }}>
                Take Free Mock Test ⏱️
              </Link>
            </div>
          </div>

          {/* Banking Card */}
          <div style={{ border: "1px solid #004085", background: "#fff" }}>
            <div style={{ background: "#004085", color: "#fff", padding: "8px 12px", fontWeight: "bold", fontSize: "16px" }}>
              Banking (IBPS & SBI)
            </div>
            <div style={{ padding: "15px" }}>
              <p style={{ fontSize: "13px", color: "#555", marginBottom: "15px" }}>
                Master Quantitative Aptitude & Reasoning for PO and Clerk exams.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 15px 0", fontSize: "13px", lineHeight: "1.8" }}>
                <li>📄 <a href="https://www.ibps.in" target="_blank" rel="noopener noreferrer" style={{ color: "#004085", fontWeight: "bold" }}>Download Latest Syllabus</a></li>
                <li>📚 <a href="https://www.ibps.in" target="_blank" rel="noopener noreferrer" style={{ color: "#004085", fontWeight: "bold" }}>Topic-wise Practice Sets</a></li>
              </ul>
              <Link href="/exam-prep/mock-test" style={{ background: "#28a745", color: "#fff", padding: "8px", display: "block", textAlign: "center", fontWeight: "bold", textDecoration: "none", borderRadius: "3px", fontSize: "13px" }}>
                Take Free Mock Test ⏱️
              </Link>
            </div>
          </div>

          {/* SSC Card */}
          <div style={{ border: "1px solid #004085", background: "#fff" }}>
            <div style={{ background: "#004085", color: "#fff", padding: "8px 12px", fontWeight: "bold", fontSize: "16px" }}>
              SSC CGL & CHSL
            </div>
            <div style={{ padding: "15px" }}>
              <p style={{ fontSize: "13px", color: "#555", marginBottom: "15px" }}>
                Target Tier I & Tier II with expert-curated mock exams and quick revision notes.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 15px 0", fontSize: "13px", lineHeight: "1.8" }}>
                <li>📄 <a href="https://ssc.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#004085", fontWeight: "bold" }}>Complete Pattern Guide</a></li>
                <li>📚 <a href="https://ssc.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#004085", fontWeight: "bold" }}>English & Math Formulas</a></li>
              </ul>
              <Link href="/exam-prep/mock-test" style={{ background: "#28a745", color: "#fff", padding: "8px", display: "block", textAlign: "center", fontWeight: "bold", textDecoration: "none", borderRadius: "3px", fontSize: "13px" }}>
                Take Free Mock Test ⏱️
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
