"use client";

import { useState } from "react";
import confetti from "canvas-confetti";

export default function ResumeBuilderPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: ""
  });
  
  const [isGenerated, setIsGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
    // Emotion: Trigger celebration
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00e5ff', '#00ff94', '#7000ff']
    });
  };

  if (isGenerated) {
    return (
      <main className="container" style={{ padding: "4rem 0", maxWidth: "800px" }}>
        <button onClick={() => setIsGenerated(false)} className="btn btn-secondary" style={{ marginBottom: "2rem" }}>← Edit Details</button>
        
        <div style={{ background: "#fff", color: "#000", padding: "4rem", borderRadius: "8px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
          <h1 style={{ fontSize: "3rem", borderBottom: "3px solid var(--color-primary)", paddingBottom: "1rem", marginBottom: "2rem", textTransform: "uppercase" }}>
            {formData.name || "Your Name"}
          </h1>
          
          <div style={{ display: "flex", gap: "2rem", marginBottom: "3rem", color: "#444", fontWeight: 600 }}>
            <span>📧 {formData.email || "email@example.com"}</span>
            <span>📱 {formData.phone || "+91 98765 43210"}</span>
          </div>
          
          <h2 style={{ fontSize: "1.5rem", color: "var(--color-primary)", marginBottom: "1rem", textTransform: "uppercase" }}>Education</h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem", whiteSpace: "pre-line" }}>{formData.education || "Bachelor of Technology, ABC University (2020-2024)"}</p>
          
          <h2 style={{ fontSize: "1.5rem", color: "var(--color-primary)", marginBottom: "1rem", textTransform: "uppercase" }}>Experience</h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem", whiteSpace: "pre-line" }}>{formData.experience || "Software Engineer Intern at XYZ Corp."}</p>
          
          <h2 style={{ fontSize: "1.5rem", color: "var(--color-primary)", marginBottom: "1rem", textTransform: "uppercase" }}>Skills</h2>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {(formData.skills || "JavaScript, React, Node.js, Python").split(',').map((skill, idx) => (
              <span key={idx} style={{ background: "#f0f0f0", padding: "0.5rem 1rem", borderRadius: "4px", fontWeight: 600, border: "1px solid #ccc" }}>
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
        
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button className="btn btn-primary" onClick={() => window.print()} style={{ fontSize: "1.25rem", padding: "1rem 3rem" }}>Download as PDF</button>
        </div>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: "4rem 0", maxWidth: "600px" }}>
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 className="text-gradient" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>AI Resume Builder</h1>
        <p style={{ color: "var(--text-muted)" }}>Fill in your details below to instantly generate a professional resume.</p>
      </header>

      <div className="card">
        <form onSubmit={handleGenerate} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" style={{ width: "100%", padding: "1rem", borderRadius: "12px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} />
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" style={{ width: "100%", padding: "1rem", borderRadius: "12px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Phone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 9876543210" style={{ width: "100%", padding: "1rem", borderRadius: "12px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} />
            </div>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Education</label>
            <textarea name="education" value={formData.education} onChange={handleChange} rows={3} placeholder="B.Tech in Computer Science, XYZ College (2024)" style={{ width: "100%", padding: "1rem", borderRadius: "12px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", resize: "vertical" }} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Experience</label>
            <textarea name="experience" value={formData.experience} onChange={handleChange} rows={3} placeholder="Intern at Tech Innovations Inc." style={{ width: "100%", padding: "1rem", borderRadius: "12px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", resize: "vertical" }} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Skills (Comma Separated)</label>
            <input name="skills" value={formData.skills} onChange={handleChange} placeholder="JavaScript, React, Python, Communication" style={{ width: "100%", padding: "1rem", borderRadius: "12px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem", padding: "1.2rem", fontSize: "1.1rem" }}>
            ✨ Generate Professional Resume
          </button>
        </form>
      </div>
    </main>
  );
}
