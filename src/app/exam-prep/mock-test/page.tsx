"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Sample Question Bank (Mock Data)
const MOCK_QUESTIONS = [
  {
    id: 1,
    question: "Who is known as the Father of the Indian Constitution?",
    options: [
      "Mahatma Gandhi",
      "Jawaharlal Nehru",
      "Dr. B.R. Ambedkar",
      "Sardar Vallabhbhai Patel"
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which of the following planets is known as the 'Red Planet'?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "If a train travels 60 km in 45 minutes, what is its speed in km/hr?",
    options: ["80 km/hr", "75 km/hr", "90 km/hr", "70 km/hr"],
    correctAnswer: 0
  },
  {
    id: 4,
    question: "The Article 370 of the Indian Constitution was related to which state?",
    options: ["Punjab", "Assam", "Jammu & Kashmir", "Kerala"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "What is the synonym of 'Abundant'?",
    options: ["Scarce", "Plentiful", "Rare", "Brief"],
    correctAnswer: 1
  }
];

const TOTAL_TIME_SECONDS = 300; // 5 minutes

export default function MockTestPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_SECONDS);

  // Timer Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (hasStarted && !showResults && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResults) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [hasStarted, showResults, timeLeft]);

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleSelectOption = (optionIdx: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestionIdx]: optionIdx
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
    let score = 0;
    MOCK_QUESTIONS.forEach((q, idx) => {
      if (selectedOptions[idx] === q.correctAnswer) {
        score += 1;
      }
    });
    const percentage = Math.round((score / MOCK_QUESTIONS.length) * 100);
    if (percentage >= 60) {
      setTimeout(() => {
        import("canvas-confetti").then((module) => {
          const confetti = module.default;
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#00ff94', '#00e5ff']
          });
        });
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    MOCK_QUESTIONS.forEach((q, idx) => {
      if (selectedOptions[idx] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  // Format Time
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // --- RENDERING VIEWS ---

  if (!hasStarted) {
    return (
      <main className="container" style={{ padding: "4rem 0", maxWidth: "600px", textAlign: "center" }}>
        <div className="card animate-float">
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⏱️</div>
          <h1 className="text-gradient" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>SSC/UPSC Mini Mock</h1>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "1.1rem" }}>
            Test your knowledge with this quick 5-question mock test. Covers General Knowledge, Quantitative Aptitude, and English.
          </p>
          <div style={{ background: "var(--bg-subtle)", padding: "1.5rem", borderRadius: "12px", marginBottom: "2rem", textAlign: "left" }}>
            <h3 style={{ marginBottom: "1rem", color: "var(--color-primary)" }}>Instructions:</h3>
            <ul style={{ color: "var(--text-muted)", marginLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>Total Questions: {MOCK_QUESTIONS.length}</li>
              <li>Total Time: {formatTime(TOTAL_TIME_SECONDS)}</li>
              <li>Each correct answer yields 1 mark.</li>
              <li>No negative marking in this practice set.</li>
            </ul>
          </div>
          <button onClick={handleStart} className="btn btn-primary pulse-button" style={{ width: "100%", fontSize: "1.25rem", padding: "1rem" }}>
            Start Test Now
          </button>
        </div>
      </main>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / MOCK_QUESTIONS.length) * 100);
    const isPass = percentage >= 60;

    return (
      <main className="container" style={{ padding: "4rem 0", maxWidth: "800px" }}>
        <div className="card" style={{ textAlign: "center", border: `1px solid ${isPass ? 'var(--color-success)' : 'var(--color-accent)'}` }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: isPass ? "var(--color-success)" : "var(--color-accent)" }}>
            {isPass ? "Excellent Work! 🏆" : "Keep Practicing! 💪"}
          </h1>
          <div style={{ fontSize: "5rem", fontWeight: 800, margin: "2rem 0", color: "#fff" }}>
            {score} <span style={{ fontSize: "2rem", color: "var(--text-muted)" }}>/ {MOCK_QUESTIONS.length}</span>
          </div>
          
          <div style={{ width: "100%", background: "var(--bg-main)", borderRadius: "20px", height: "20px", marginBottom: "3rem", overflow: "hidden" }}>
            <div style={{ 
              width: `${percentage}%`, 
              height: "100%", 
              background: isPass ? "var(--color-success)" : "var(--color-accent)",
              transition: "width 1s ease-in-out"
            }}></div>
          </div>

          <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", textAlign: "left" }}>Detailed Analysis</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", textAlign: "left" }}>
            {MOCK_QUESTIONS.map((q, idx) => {
              const userAns = selectedOptions[idx];
              const isCorrect = userAns === q.correctAnswer;
              
              return (
                <div key={q.id} style={{ padding: "1.5rem", background: "var(--bg-subtle)", borderRadius: "12px", borderLeft: `4px solid ${isCorrect ? 'var(--color-success)' : 'var(--color-accent)'}` }}>
                  <p style={{ fontWeight: 600, marginBottom: "1rem" }}>Q{idx + 1}. {q.question}</p>
                  <p style={{ fontSize: "0.9rem", color: isCorrect ? "var(--color-success)" : "var(--color-accent)", marginBottom: "0.5rem" }}>
                    Your Answer: {userAns !== undefined ? q.options[userAns] : "Not Attempted"} {isCorrect ? "✅" : "❌"}
                  </p>
                  {!isCorrect && (
                    <p style={{ fontSize: "0.9rem", color: "var(--color-primary)" }}>
                      Correct Answer: {q.options[q.correctAnswer]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: "3rem", display: "flex", gap: "1rem" }}>
            <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ flex: 1 }}>Retake Test</button>
            <Link href="/exam-prep" className="btn btn-secondary" style={{ flex: 1 }}>Back to Hub</Link>
          </div>
        </div>
      </main>
    );
  }

  // Active Test View
  const question = MOCK_QUESTIONS[currentQuestionIdx];

  return (
    <main className="container" style={{ padding: "2rem 0", maxWidth: "800px" }}>
      
      {/* Test Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", padding: "1rem", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
        <div>
          <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Question</span>
          <div style={{ fontWeight: 800, fontSize: "1.25rem", color: "var(--color-primary)" }}>
            {currentQuestionIdx + 1} / {MOCK_QUESTIONS.length}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Time Remaining</span>
          <div style={{ fontWeight: 800, fontSize: "1.5rem", color: timeLeft < 60 ? "var(--color-accent)" : "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ width: "100%", height: "4px", background: "var(--bg-card)", marginBottom: "3rem", borderRadius: "2px" }}>
        <div style={{ 
          width: `${((currentQuestionIdx + 1) / MOCK_QUESTIONS.length) * 100}%`, 
          height: "100%", 
          background: "var(--color-primary)",
          transition: "width 0.3s ease"
        }}></div>
      </div>

      {/* Question Card */}
      <div className="card" style={{ padding: "3rem 2rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem", lineHeight: 1.4 }}>
          {currentQuestionIdx + 1}. {question.question}
        </h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {question.options.map((opt, optIdx) => {
            const isSelected = selectedOptions[currentQuestionIdx] === optIdx;
            
            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                style={{
                  padding: "1.25rem",
                  textAlign: "left",
                  fontSize: "1.1rem",
                  borderRadius: "12px",
                  background: isSelected ? "rgba(0, 255, 148, 0.15)" : "var(--bg-subtle)",
                  border: `1px solid ${isSelected ? "var(--color-primary)" : "var(--border-color)"}`,
                  color: isSelected ? "var(--color-primary)" : "#fff",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => !isSelected && (e.currentTarget.style.borderColor = "var(--color-primary-glow)")}
                onMouseOut={(e) => !isSelected && (e.currentTarget.style.borderColor = "var(--border-color)")}
              >
                <span style={{ fontWeight: 800, marginRight: "1rem", opacity: 0.7 }}>
                  {String.fromCharCode(65 + optIdx)}.
                </span>
                {opt}
              </button>
            )
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border-color)" }}>
          <button 
            onClick={handlePrevious} 
            disabled={currentQuestionIdx === 0}
            className="btn btn-secondary"
            style={{ opacity: currentQuestionIdx === 0 ? 0.3 : 1 }}
          >
            ← Previous
          </button>
          
          <button 
            onClick={handleNext} 
            className="btn btn-primary"
          >
            {currentQuestionIdx === MOCK_QUESTIONS.length - 1 ? "Submit Test ✓" : "Next →"}
          </button>
        </div>
      </div>

    </main>
  );
}
