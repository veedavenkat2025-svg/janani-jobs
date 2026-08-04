"use client";

import { useState } from "react";

export default function ResumeBuilderPage() {
  const [data, setData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    summary: "Dedicated professional with a strong track record of success.",
    education: "B.Tech in Computer Science - XYZ University (2020-2024)",
    experience: "Software Engineer at Tech Solutions (2024 - Present)\n- Developed core features\n- Improved performance by 30%",
    skills: "JavaScript, React, Node.js, SQL"
  });

  const handlePrint = () => {
    window.print();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <main className="container" style={{ padding: "2rem 0", maxWidth: "1200px" }}>
      <header className="hide-on-print" style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 className="text-gradient" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          Interactive Resume Builder
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Fill in your details below and download a beautiful PDF.
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Left Column: Form */}
        <div className="card hide-on-print" style={{ padding: "2rem" }}>
          <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}>Your Details</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Full Name</label>
              <input type="text" name="name" value={data.name} onChange={handleChange} style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-subtle)", color: "var(--text-main)" }} />
            </div>
            
            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Email</label>
                <input type="email" name="email" value={data.email} onChange={handleChange} style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-subtle)", color: "var(--text-main)" }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Phone</label>
                <input type="text" name="phone" value={data.phone} onChange={handleChange} style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-subtle)", color: "var(--text-main)" }} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Professional Summary</label>
              <textarea name="summary" value={data.summary} onChange={handleChange} rows={3} style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-subtle)", color: "var(--text-main)", resize: "vertical" }} />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Education</label>
              <textarea name="education" value={data.education} onChange={handleChange} rows={3} style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-subtle)", color: "var(--text-main)", resize: "vertical" }} />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Work Experience</label>
              <textarea name="experience" value={data.experience} onChange={handleChange} rows={4} style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-subtle)", color: "var(--text-main)", resize: "vertical" }} />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Skills</label>
              <input type="text" name="skills" value={data.skills} onChange={handleChange} style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-subtle)", color: "var(--text-main)" }} />
            </div>

            <button onClick={handlePrint} className="btn btn-primary" style={{ marginTop: "1rem", padding: "1rem", fontSize: "1.125rem" }}>
              Download PDF
            </button>
          </div>
        </div>

        {/* Right Column: Live Preview */}
        <div className="resume-preview" style={{ background: "#ffffff", color: "#000000", padding: "3rem", borderRadius: "8px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", minHeight: "800px" }}>
          
          {/* Header */}
          <div style={{ textAlign: "center", borderBottom: "2px solid #2d3748", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 700, margin: "0 0 0.5rem 0", color: "#1a202c" }}>{data.name || "Your Name"}</h1>
            <div style={{ color: "#4a5568", fontSize: "1rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
              <span>{data.email || "Email"}</span>
              <span>•</span>
              <span>{data.phone || "Phone"}</span>
            </div>
          </div>

          {/* Summary */}
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.25rem", color: "#2d3748", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
              Summary
            </h2>
            <p style={{ lineHeight: 1.6, color: "#4a5568" }}>{data.summary}</p>
          </div>

          {/* Experience */}
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.25rem", color: "#2d3748", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
              Experience
            </h2>
            <div style={{ lineHeight: 1.6, color: "#4a5568", whiteSpace: "pre-wrap" }}>
              {data.experience}
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.25rem", color: "#2d3748", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
              Education
            </h2>
            <div style={{ lineHeight: 1.6, color: "#4a5568", whiteSpace: "pre-wrap" }}>
              {data.education}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 style={{ fontSize: "1.25rem", color: "#2d3748", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
              Skills
            </h2>
            <p style={{ lineHeight: 1.6, color: "#4a5568" }}>{data.skills}</p>
          </div>

        </div>
      </div>
    </main>
  );
}
