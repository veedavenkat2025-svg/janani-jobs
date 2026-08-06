import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="container" style={{ padding: "4rem 0", maxWidth: "800px", margin: "0 auto" }}>
      <div className="card">
        <h1 className="text-gradient" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Privacy Policy</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Last updated: August 2026</p>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--color-primary)" }}>1. Information We Collect</h2>
          <p style={{ color: "var(--text-main)", marginBottom: "1rem" }}>
            When you register for an account on Janani Jobs, we collect your name, email address, and educational qualifications. 
            We use this information to personalize your job feed and provide relevant career opportunities.
          </p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--color-primary)" }}>2. How We Use Your Data</h2>
          <ul style={{ color: "var(--text-main)", marginLeft: "1.5rem", listStyleType: "disc" }}>
            <li style={{ marginBottom: "0.5rem" }}>To provide and maintain our service</li>
            <li style={{ marginBottom: "0.5rem" }}>To notify you about relevant job alerts and mock tests</li>
            <li style={{ marginBottom: "0.5rem" }}>To securely authenticate your account</li>
          </ul>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--color-primary)" }}>3. Data Security</h2>
          <p style={{ color: "var(--text-main)", marginBottom: "1rem" }}>
            We implement industry-standard security measures to protect your personal data. Your passwords are encrypted 
            and safely stored. We do not sell your personal data to third parties.
          </p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--color-primary)" }}>4. Contact Us</h2>
          <p style={{ color: "var(--text-main)", marginBottom: "1rem" }}>
            If you have any questions about this Privacy Policy, please contact us at <strong>support@jananijobs.com</strong>.
          </p>
        </section>

        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border-color)" }}>
          <Link href="/" className="btn btn-secondary">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
