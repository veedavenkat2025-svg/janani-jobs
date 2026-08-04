"use client";

import { useState } from "react";
import { careerFinderData } from "@/lib/careerData";
import Link from "next/link";

export default function CareerFinderPage() {
  const [education, setEducation] = useState("");
  const [stream, setStream] = useState("");
  const [results, setResults] = useState<any>(null);

  const handleEducationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEducation(e.target.value);
    setStream(""); // Reset stream on edu change
    setResults(null);
  };

  const handleStreamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStream(e.target.value);
    setResults(null);
  };

  const handleSearch = () => {
    if (!education) return;
    const recs = careerFinderData.getRecommendations(education, stream);
    setResults(recs);
  };

  return (
    <main className="container" style={{ padding: "4rem 0", maxWidth: "1000px" }}>
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 className="text-gradient" style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
          What Can I Become?
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto" }}>
          Tell us what you've studied, and we'll show you exactly which government jobs, private roles, and competitive exams you qualify for.
        </p>
      </header>

      {/* Quiz Card */}
      <div className="card" style={{ padding: "3rem", marginBottom: "3rem", background: "var(--bg-subtle)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          <div>
            <label style={{ display: "block", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              1. What is your highest qualification?
            </label>
            <select 
              value={education} 
              onChange={handleEducationChange}
              style={{ width: "100%", padding: "1rem", fontSize: "1rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-main)" }}
            >
              <option value="">-- Select Qualification --</option>
              {careerFinderData.educationLevels.map(lvl => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>

          {education && education !== "10th Pass" && (
            <div>
              <label style={{ display: "block", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                2. What was your Stream/Degree?
              </label>
              <select 
                value={stream} 
                onChange={handleStreamChange}
                style={{ width: "100%", padding: "1rem", fontSize: "1rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-main)" }}
              >
                <option value="">-- Select Stream --</option>
                {/* @ts-ignore */}
                {careerFinderData.streams[education]?.map((st: string) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          )}

          <button 
            onClick={handleSearch} 
            disabled={!education || (education !== "10th Pass" && !stream)}
            className="btn btn-primary" 
            style={{ padding: "1rem", fontSize: "1.25rem", marginTop: "1rem" }}
          >
            Show My Career Options ✨
          </button>

        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", animation: "fadeIn 0.5s ease" }}>
          
          <h2 style={{ fontSize: "2rem", textAlign: "center", marginBottom: "1rem", borderBottom: "2px solid var(--border-color)", paddingBottom: "1rem" }}>
            Your Personalized Opportunities
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            
            {/* Govt Jobs */}
            <div className="card" style={{ borderTop: "4px solid var(--color-primary)" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--color-primary)" }}>🏛️ Govt Jobs You Qualify For</h3>
              {results.government.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {results.government.map((job: any, i: number) => (
                    <li key={i} style={{ padding: "1rem", background: "var(--bg-subtle)", borderRadius: "8px" }}>
                      <div style={{ fontWeight: 600, fontSize: "1.125rem", marginBottom: "0.25rem" }}>{job.title}</div>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Expected Salary: {job.salary}</div>
                    </li>
                  ))}
                </ul>
              ) : <p>Select your criteria to see options.</p>}
            </div>

            {/* Exams */}
            <div className="card" style={{ borderTop: "4px solid #f59e0b" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#f59e0b" }}>📚 Top Exams to Prepare For</h3>
              {results.exams.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {results.exams.map((exam: any, i: number) => (
                    <li key={i} style={{ padding: "1rem", background: "var(--bg-subtle)", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 600, fontSize: "1.125rem" }}>{exam.title}</span>
                      <a href={`https://${exam.link}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}>
                        Official Site
                      </a>
                    </li>
                  ))}
                </ul>
              ) : <p>Select your criteria to see options.</p>}
            </div>

            {/* Private Jobs */}
            <div className="card" style={{ borderTop: "4px solid var(--color-secondary)" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--color-secondary)" }}>🏢 Private Sector Roles</h3>
              {results.private.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {results.private.map((job: any, i: number) => (
                    <li key={i} style={{ padding: "1rem", background: "var(--bg-subtle)", borderRadius: "8px" }}>
                      <div style={{ fontWeight: 600, fontSize: "1.125rem", marginBottom: "0.25rem" }}>{job.title}</div>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Expected Salary: {job.salary}</div>
                    </li>
                  ))}
                </ul>
              ) : <p>Select your criteria to see options.</p>}
            </div>

          </div>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
             <Link href="/jobs" className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.125rem" }}>
                Browse Live Jobs Now →
             </Link>
          </div>

        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </main>
  );
}
