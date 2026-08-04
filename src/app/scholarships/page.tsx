export default function ScholarshipsPage() {
  const scholarships = [
    { name: "Post Matric Scholarship Scheme for Minorities", type: "Central Govt", amount: "Up to ₹10,000/year", link: "scholarships.gov.in" },
    { name: "Central Sector Scheme of Scholarships for College", type: "Central Govt", amount: "₹10,000 - ₹20,000/year", link: "scholarships.gov.in" },
    { name: "AICTE Pragati Scholarship for Girls", type: "AICTE", amount: "₹50,000/year", link: "aicte-pragati-saksham-gov.in" },
    { name: "National Means Cum Merit Scholarship (NMMSS)", type: "Central Govt", amount: "₹12,000/year", link: "scholarships.gov.in" },
    { name: "PM Vidyalaxmi Scheme", type: "Bank Loans/Subsidies", amount: "Education Loan Support", link: "vidyalakshmi.co.in" }
  ];

  return (
    <main className="container" style={{ padding: "4rem 0", maxWidth: "1000px" }}>
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 className="text-gradient" style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
          Scholarship Finder
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", maxWidth: "700px", margin: "0 auto" }}>
          Don't let finances stop your education. Thousands of government scholarships go unclaimed every year. Find yours here.
        </p>
      </header>

      <div className="card" style={{ marginBottom: "2rem", background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--color-primary)" }}>NSP - National Scholarship Portal</h2>
        <p style={{ marginBottom: "1rem" }}>The Government of India has a unified portal for almost all central and state scholarships. This is the first place every student should register.</p>
        <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Visit scholarships.gov.in</a>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Top Schemes You Should Know</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "var(--bg-subtle)", borderBottom: "2px solid var(--border-color)" }}>
                <th style={{ padding: "1rem", fontWeight: 700 }}>Scholarship Name</th>
                <th style={{ padding: "1rem", fontWeight: 700 }}>Provider</th>
                <th style={{ padding: "1rem", fontWeight: 700 }}>Amount/Benefit</th>
                <th style={{ padding: "1rem", fontWeight: 700 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((s, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "1rem", fontWeight: 600 }}>{s.name}</td>
                  <td style={{ padding: "1rem" }}>{s.type}</td>
                  <td style={{ padding: "1rem", color: "var(--color-primary)" }}>{s.amount}</td>
                  <td style={{ padding: "1rem" }}>
                    <a href={`https://${s.link}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}>
                      Apply
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
