"use client";

import { useState } from "react";
import Link from "next/link";

export default function CareerFinderPage() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "What is your primary career goal?",
      options: [
        { text: "Long-term job security & benefits", points: -1 },
        { text: "Rapid growth & high salary potential", points: 1 }
      ]
    },
    {
      question: "How do you prefer your work environment?",
      options: [
        { text: "Structured, with clear rules and timings", points: -1 },
        { text: "Fast-paced, flexible, and dynamic", points: 1 }
      ]
    },
    {
      question: "Are you willing to relocate frequently?",
      options: [
        { text: "Yes, I can move across India if required", points: -1 },
        { text: "No, I prefer staying in major tech/metro hubs", points: 1 }
      ]
    }
  ];

  const handleAnswer = (points: number) => {
    setScore(score + points);
    setStep(step + 1);
  };

  const isGovt = score < 0;

  if (step >= questions.length) {
    return (
      <main className="container" style={{ padding: "6rem 0", maxWidth: "600px", textAlign: "center" }}>
        <h1 className="text-gradient" style={{ fontSize: "3rem", marginBottom: "1rem" }}>Your Perfect Match</h1>
        <div className="card animate-float" style={{ padding: "4rem 2rem", border: `1px solid ${isGovt ? "rgba(0, 255, 148, 0.3)" : "rgba(0, 229, 255, 0.3)"}`, background: isGovt ? "rgba(0, 255, 148, 0.05)" : "rgba(0, 229, 255, 0.05)" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{isGovt ? "🏛️" : "🚀"}</div>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            {isGovt ? "Government Sector" : "Private & Startup Sector"}
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "3rem", fontSize: "1.1rem" }}>
            {isGovt 
              ? "Based on your answers, you value stability, structured growth, and excellent benefits. You are a perfect fit for UPSC, SSC, and Banking jobs!" 
              : "Based on your answers, you value rapid growth, dynamic environments, and high reward potential. The private sector is calling your name!"}
          </p>
          
          <Link href={isGovt ? "/jobs?type=GOVERNMENT" : "/jobs?type=PRIVATE"} className="btn btn-primary pulse-button" style={{ padding: "1rem 2rem", fontSize: "1.2rem" }}>
            Browse {isGovt ? "Government" : "Private"} Jobs →
          </Link>
        </div>
      </main>
    );
  }

  const currentQ = questions[step];

  return (
    <main className="container" style={{ padding: "4rem 0", maxWidth: "600px", textAlign: "center" }}>
      <header style={{ marginBottom: "4rem" }}>
        <h1 className="text-gradient" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Career Path Finder</h1>
        <p style={{ color: "var(--text-muted)" }}>Answer a few quick questions to find your ideal career trajectory.</p>
      </header>

      <div style={{ width: "100%", height: "6px", background: "var(--bg-card)", marginBottom: "3rem", borderRadius: "3px" }}>
        <div style={{ width: `${(step / questions.length) * 100}%`, height: "100%", background: "var(--color-primary)", transition: "width 0.3s ease" }}></div>
      </div>

      <div className="card" style={{ padding: "3rem 2rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "3rem" }}>{currentQ.question}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {currentQ.options.map((opt, idx) => (
            <button 
              key={idx}
              onClick={() => handleAnswer(opt.points)}
              style={{
                padding: "1.5rem",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "var(--bg-subtle)",
                color: "#fff",
                fontSize: "1.1rem",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--color-primary)"}
              onMouseOut={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
