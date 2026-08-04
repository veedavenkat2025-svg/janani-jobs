"use client";

import { useState } from "react";
import { careerPathwaysData, CareerOption } from "@/lib/careerData";
import Link from "next/link";

function CareerNode({ option, level = 0 }: { option: CareerOption, level?: number }) {
  const [expanded, setExpanded] = useState(level === 0);

  const hasChildren = option.nextSteps && option.nextSteps.length > 0;
  const hasJobsOrExams = (option.jobs && option.jobs.length > 0) || (option.exams && option.exams.length > 0);

  return (
    <div style={{ marginLeft: level * 20 + "px", marginTop: "1rem" }}>
      <div 
        className="card" 
        onClick={() => setExpanded(!expanded)}
        style={{ 
          cursor: hasChildren ? "pointer" : "default",
          borderLeft: level === 0 ? "4px solid var(--color-primary)" : level === 1 ? "4px solid var(--color-secondary)" : "1px solid var(--border-color)",
          padding: "1.5rem",
          background: expanded && level === 0 ? "var(--bg-subtle)" : "var(--bg-card)",
          transition: "all 0.3s ease"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: level === 0 ? "1.5rem" : "1.25rem", margin: 0 }}>
            {option.title}
          </h3>
          {hasChildren && (
            <span style={{ fontSize: "1.5rem", color: "var(--text-muted)", transition: "transform 0.3s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>
              ▼
            </span>
          )}
        </div>
        
        <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>{option.description}</p>

        {/* Display Jobs and Exams if this is a leaf node */}
        {expanded && hasJobsOrExams && (
          <div style={{ marginTop: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", animation: "fadeIn 0.3s ease" }}>
            
            {option.jobs && option.jobs.length > 0 && (
              <div style={{ background: "rgba(16, 185, 129, 0.05)", padding: "1rem", borderRadius: "8px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                <h4 style={{ color: "var(--color-primary)", marginBottom: "0.5rem" }}>Top Job Roles</h4>
                <ul style={{ listStyle: "inside", padding: 0, margin: 0, fontSize: "0.875rem" }}>
                  {option.jobs.map((job, idx) => (
                    <li key={idx} style={{ marginBottom: "0.25rem" }}>
                      <strong>{job.title}</strong> ({job.type}) <br/>
                      <span style={{ color: "var(--text-muted)", marginLeft: "1rem" }}>{job.salary}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {option.exams && option.exams.length > 0 && (
              <div style={{ background: "rgba(245, 158, 11, 0.05)", padding: "1rem", borderRadius: "8px", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                <h4 style={{ color: "#f59e0b", marginBottom: "0.5rem" }}>Key Entrance Exams</h4>
                <ul style={{ listStyle: "inside", padding: 0, margin: 0, fontSize: "0.875rem" }}>
                  {option.exams.map((exam, idx) => (
                    <li key={idx} style={{ marginBottom: "0.25rem" }}>
                      <strong>{exam.title}</strong> <br/>
                      <span style={{ color: "var(--text-muted)", marginLeft: "1rem" }}>Elig: {exam.eligibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        )}
      </div>

      {expanded && hasChildren && (
        <div style={{ borderLeft: "2px dashed var(--border-color)", marginLeft: "20px", paddingLeft: "10px", animation: "fadeIn 0.4s ease" }}>
          {option.nextSteps!.map(child => (
            <CareerNode key={child.id} option={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CareerPathsPage() {
  return (
    <main className="container" style={{ padding: "4rem 0", maxWidth: "900px" }}>
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 className="text-gradient" style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
          Career Pathways Explorer
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", maxWidth: "700px", margin: "0 auto" }}>
          Confused about what to do after 10th or 12th? Explore our interactive roadmap to discover streams, degrees, and the jobs they lead to.
        </p>
      </header>

      <div style={{ marginBottom: "4rem" }}>
        {careerPathwaysData.map(rootNode => (
          <CareerNode key={rootNode.id} option={rootNode} />
        ))}
      </div>

      <div className="card" style={{ textAlign: "center", padding: "3rem", background: "linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(14, 165, 233, 0.1))" }}>
        <h2 style={{ marginBottom: "1rem" }}>Still not sure what you qualify for?</h2>
        <p style={{ marginBottom: "2rem", color: "var(--text-muted)" }}>
          Use our interactive "What Can I Become?" tool to input your current education and instantly see the best options for you.
        </p>
        <Link href="/career-finder" className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.125rem" }}>
          Try Career Finder Tool
        </Link>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </main>
  );
}
