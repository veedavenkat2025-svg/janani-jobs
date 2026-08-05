import Link from "next/link";

export default function ScholarshipsPage() {
  const scholarships = [
    {
      id: 1,
      title: "National Merit Scholarship",
      provider: "Ministry of Education",
      amount: "₹50,000 / year",
      deadline: "Oct 31, 2026",
      eligibility: "Top 1% of Class 12 Board Exams",
    },
    {
      id: 2,
      title: "Women in Tech Grant",
      provider: "Tech Foundation India",
      amount: "₹1,00,000 one-time",
      deadline: "Nov 15, 2026",
      eligibility: "Female students pursuing B.Tech in CS/IT",
    },
    {
      id: 3,
      title: "Post-Matric Scholarship for Minorities",
      provider: "Govt of India",
      amount: "Full Tuition + Hostel Fees",
      deadline: "Dec 01, 2026",
      eligibility: "Minority students with family income < ₹2.5L",
    },
    {
      id: 4,
      title: "Tata Innovation Fellowship",
      provider: "Tata Trusts",
      amount: "₹75,000 / year",
      deadline: "Jan 10, 2027",
      eligibility: "Graduation students with innovative research proposals",
    }
  ];

  return (
    <main className="container" style={{ padding: "4rem 0" }}>
      <header style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 className="text-gradient" style={{ fontSize: "3rem", marginBottom: "1rem" }}>Scholarships & Grants</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
          Discover financial aid opportunities to fund your education and empower your future.
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2rem" }}>
        {scholarships.map((s) => (
          <div key={s.id} className="card flex flex-col justify-between" style={{ minHeight: "280px" }}>
            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: "1.5rem" }}>
                <span style={{ 
                  padding: "0.25rem 0.75rem", 
                  borderRadius: "20px", 
                  fontSize: "0.8rem", 
                  fontWeight: 600,
                  background: "rgba(0, 229, 255, 0.1)",
                  color: "var(--color-secondary)",
                  border: "1px solid rgba(0, 229, 255, 0.3)"
                }}>
                  {s.provider}
                </span>
                <span style={{ fontSize: "0.875rem", color: "var(--color-accent)", fontWeight: 600 }}>
                  ⏳ {s.deadline}
                </span>
              </div>
              
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{s.title}</h2>
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Eligibility</p>
                <p style={{ fontWeight: 600 }}>{s.eligibility}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between" style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--border-color)" }}>
              <div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 800 }}>Amount</p>
                <p style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--color-primary)" }}>{s.amount}</p>
              </div>
              <button className="btn btn-primary" onClick={() => alert("Application Portal Opening Soon")} style={{ padding: "0.5rem 1.5rem", fontSize: "0.9rem" }}>
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
