"use client";

import { useState, useEffect } from "react";

// ATS Validation Logic Engine
const ACTION_VERBS = ["managed", "developed", "led", "improved", "increased", "created", "designed", "achieved", "implemented", "resolved"];

type ATSStatus = {
  isComplete: boolean;
  hasMetrics: boolean;
  hasActionVerbs: boolean;
  score: number;
};

export default function ResumeBuilderClient({ userName, userEmail }: { userName?: string | null, userEmail?: string | null }) {
  const [data, setData] = useState({
    name: userName || "",
    email: userEmail || "",
    phone: "",
    summary: "",
    education: "",
    experience: "",
    skills: ""
  });

  const [ats, setAts] = useState<ATSStatus>({
    isComplete: false,
    hasMetrics: false,
    hasActionVerbs: false,
    score: 0
  });

  // Calculate ATS Score in real-time
  useEffect(() => {
    let newScore = 0;
    
    // 1. Completeness Check (40 points)
    const isComplete = Boolean(data.name && data.email && data.phone && data.summary && data.education && data.experience && data.skills);
    if (isComplete) newScore += 40;

    // 2. Metrics Check (30 points) - Look for numbers, %, or $ in experience
    const hasMetrics = /\d+%|\$\d+|\d+/.test(data.experience);
    if (hasMetrics) newScore += 30;

    // 3. Action Verbs Check (30 points) - Look for strong verbs in experience
    const expLower = data.experience.toLowerCase();
    const hasActionVerbs = ACTION_VERBS.some(verb => expLower.includes(verb));
    if (hasActionVerbs) newScore += 30;

    setAts({
      isComplete,
      hasMetrics,
      hasActionVerbs,
      score: newScore
    });
  }, [data]);

  const handlePrint = () => {
    if (ats.score < 100) {
      if (!confirm("Your resume ATS score is below 100%. Are you sure you want to download it?")) {
        return;
      }
    }
    window.print();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
      {/* Left Column: Form & ATS Score */}
      <div className="hide-on-print" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        {/* ATS Dashboard */}
        <div className="card" style={{ padding: "1.5rem", border: ats.score === 100 ? "2px solid var(--color-primary)" : "2px solid #f59e0b" }}>
          <h2 style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            ATS Compatibility Score
            <span style={{ color: ats.score === 100 ? "var(--color-primary)" : "#f59e0b", fontSize: "1.5rem" }}>
              {ats.score}%
            </span>
          </h2>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: ats.isComplete ? "var(--color-primary)" : "#ef4444" }}>
              {ats.isComplete ? "✅" : "❌"} All fields completed
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: ats.hasMetrics ? "var(--color-primary)" : "#ef4444" }}>
              {ats.hasMetrics ? "✅" : "❌"} Quantifiable metrics used (e.g., numbers, %)
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: ats.hasActionVerbs ? "var(--color-primary)" : "#ef4444" }}>
              {ats.hasActionVerbs ? "✅" : "❌"} Strong action verbs used (e.g., Led, Managed)
            </li>
          </ul>
          {ats.score < 100 && (
            <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
              Fix the red items above to ensure ATS software doesn't reject your resume!
            </p>
          )}
        </div>

        {/* Input Form */}
        <div className="card" style={{ padding: "2rem" }}>
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
              <textarea name="summary" value={data.summary} onChange={handleChange} placeholder="Briefly describe your career goals..." rows={3} style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-subtle)", color: "var(--text-main)", resize: "vertical" }} />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Education</label>
              <textarea name="education" value={data.education} onChange={handleChange} placeholder="e.g. B.Tech in Computer Science - XYZ University (2020-2024)" rows={3} style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-subtle)", color: "var(--text-main)", resize: "vertical" }} />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Work Experience</label>
              <textarea name="experience" value={data.experience} onChange={handleChange} placeholder="e.g. Software Engineer (2024 - Present)&#10;- Managed 3 projects&#10;- Increased efficiency by 20%" rows={4} style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-subtle)", color: "var(--text-main)", resize: "vertical" }} />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Skills</label>
              <input type="text" name="skills" value={data.skills} onChange={handleChange} placeholder="e.g. JavaScript, Next.js, Management" style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-subtle)", color: "var(--text-main)" }} />
            </div>

            <button onClick={handlePrint} className="btn btn-primary" style={{ marginTop: "1rem", padding: "1rem", fontSize: "1.125rem", background: ats.score === 100 ? "var(--color-primary)" : "#f59e0b" }}>
              {ats.score === 100 ? "Download ATS-Perfect PDF" : "Download PDF Anyway"}
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Live Preview (100% ATS Compliant Layout) */}
      <div className="resume-preview" style={{ background: "#ffffff", color: "#000000", padding: "3rem", borderRadius: "8px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", minHeight: "1056px", fontFamily: "Arial, sans-serif", fontSize: "11pt", lineHeight: "1.4" }}>
        
        {/* Header - Simple Centered */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "24pt", fontWeight: "bold", margin: "0 0 0.25rem 0", textTransform: "uppercase" }}>{data.name || "YOUR NAME"}</h1>
          <div style={{ fontSize: "11pt" }}>
            {data.email || "email@example.com"} | {data.phone || "(123) 456-7890"}
          </div>
        </div>

        {/* Summary */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "12pt", fontWeight: "bold", textTransform: "uppercase", borderBottom: "1px solid #000", paddingBottom: "0.25rem", marginBottom: "0.5rem" }}>
            Professional Summary
          </h2>
          <p>{data.summary || "A dedicated professional with..."}</p>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "12pt", fontWeight: "bold", textTransform: "uppercase", borderBottom: "1px solid #000", paddingBottom: "0.25rem", marginBottom: "0.5rem" }}>
            Professional Experience
          </h2>
          <div style={{ whiteSpace: "pre-wrap" }}>
            {data.experience || "Company Name - Job Title\n- Key achievement using metrics\n- Another key achievement"}
          </div>
        </div>

        {/* Education */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "12pt", fontWeight: "bold", textTransform: "uppercase", borderBottom: "1px solid #000", paddingBottom: "0.25rem", marginBottom: "0.5rem" }}>
            Education
          </h2>
          <div style={{ whiteSpace: "pre-wrap" }}>
            {data.education || "University Name - Degree (Year)"}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 style={{ fontSize: "12pt", fontWeight: "bold", textTransform: "uppercase", borderBottom: "1px solid #000", paddingBottom: "0.25rem", marginBottom: "0.5rem" }}>
            Skills
          </h2>
          <p>{data.skills || "Skill 1, Skill 2, Skill 3"}</p>
        </div>

      </div>
    </div>
  );
}
