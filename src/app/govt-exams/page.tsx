import Link from "next/link";

export default function GovtExamsPage() {
  const exams = [
    { name: "UPSC Civil Services (IAS/IPS)", eligibility: "Graduation (Any Stream)", age: "21-32 Years", salary: "₹56,100 - ₹2,50,000", link: "upsc.gov.in" },
    { name: "SSC CGL (Combined Graduate Level)", eligibility: "Graduation (Any Stream)", age: "18-32 Years", salary: "₹25,500 - ₹1,51,100", link: "ssc.gov.in" },
    { name: "IBPS PO (Bank Probationary Officer)", eligibility: "Graduation (Any Stream)", age: "20-30 Years", salary: "₹52,000 - ₹55,000", link: "ibps.in" },
    { name: "SBI PO (State Bank of India)", eligibility: "Graduation (Any Stream)", age: "21-30 Years", salary: "₹65,000+", link: "sbi.co.in/careers" },
    { name: "RRB NTPC (Non-Technical Popular Categories)", eligibility: "12th Pass / Graduation", age: "18-33 Years", salary: "₹19,900 - ₹35,400", link: "rrbcdg.gov.in" },
    { name: "SSC CHSL (Combined Higher Secondary Level)", eligibility: "12th Pass", age: "18-27 Years", salary: "₹19,900 - ₹25,500", link: "ssc.gov.in" },
    { name: "SSC MTS (Multi-Tasking Staff)", eligibility: "10th Pass", age: "18-25 Years", salary: "₹18,000 - ₹22,000", link: "ssc.gov.in" },
    { name: "RRB Group D", eligibility: "10th Pass / ITI", age: "18-33 Years", salary: "₹18,000+", link: "rrbcdg.gov.in" },
    { name: "NDA (National Defence Academy)", eligibility: "12th Pass (MPC preferred)", age: "16.5-19.5 Years", salary: "₹56,100+", link: "upsc.gov.in" },
    { name: "State PSC (Group 1 / Group 2)", eligibility: "Graduation", age: "21-42 Years (varies)", salary: "₹40,000+", link: "#" },
  ];

  return (
    <main className="container" style={{ padding: "4rem 0", maxWidth: "1200px" }}>
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 className="text-gradient" style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
          The Ultimate Govt Exam Database
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", maxWidth: "700px", margin: "0 auto" }}>
          Stop searching multiple websites. Here is the complete list of major government competitive exams in India, their eligibility criteria, and where to apply.
        </p>
      </header>

      <div className="card" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "var(--bg-subtle)", borderBottom: "2px solid var(--border-color)" }}>
              <th style={{ padding: "1rem", fontWeight: 700 }}>Exam Name</th>
              <th style={{ padding: "1rem", fontWeight: 700 }}>Eligibility</th>
              <th style={{ padding: "1rem", fontWeight: 700 }}>Age Limit (Gen)</th>
              <th style={{ padding: "1rem", fontWeight: 700 }}>Expected Salary</th>
              <th style={{ padding: "1rem", fontWeight: 700 }}>Official Site</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, i) => (
              <tr key={i} style={{ borderBottom: "1px solid var(--border-color)" }}>
                <td style={{ padding: "1rem", fontWeight: 600 }}>{exam.name}</td>
                <td style={{ padding: "1rem" }}>{exam.eligibility}</td>
                <td style={{ padding: "1rem" }}>{exam.age}</td>
                <td style={{ padding: "1rem", color: "var(--color-primary)" }}>{exam.salary}</td>
                <td style={{ padding: "1rem" }}>
                  <a href={`https://${exam.link}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}>
                    Visit Site
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>Note: Age limits and salaries are approximate and vary by specific posts and categories. Always check the official notification.</p>
        <Link href="/career-finder" className="btn btn-primary">Find Exams I Qualify For</Link>
      </div>
    </main>
  );
}
