'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EligibilityCalculator() {
  const router = useRouter();
  const [qual, setQual] = useState('');
  const [state, setState] = useState('All India');
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<{
    age: number;
    eligible: string[];
    notEligible: string[];
  } | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate precise age from full DOB
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age > 0 && age < 100) {
        // Determine eligibility for common exams
        const eligible: string[] = [];
        const notEligible: string[] = [];

        const exams = [
          { name: 'SSC CGL / CHSL', minAge: 18, maxAge: 32 },
          { name: 'UPSC Civil Services', minAge: 21, maxAge: 32 },
          { name: 'RRB NTPC / ALP', minAge: 18, maxAge: 33 },
          { name: 'Banking (IBPS / SBI PO)', minAge: 20, maxAge: 30 },
          { name: 'SSC GD Constable', minAge: 18, maxAge: 23 },
          { name: 'State Police / SI', minAge: 18, maxAge: 28 },
          { name: 'Indian Army Soldier', minAge: 17, maxAge: 23 },
          { name: 'Defence (NDA / CDS)', minAge: 19, maxAge: 25 },
        ];

        for (const exam of exams) {
          if (age >= exam.minAge && age <= exam.maxAge) {
            eligible.push(`${exam.name} (${exam.minAge}-${exam.maxAge} yrs)`);
          } else {
            notEligible.push(`${exam.name} (${exam.minAge}-${exam.maxAge} yrs)`);
          }
        }

        setResult({ age, eligible, notEligible });
      } else {
        setResult(null);
      }
    }

    // Navigate with filters
    const params = new URLSearchParams();
    if (qual) params.set('qual', qual);
    if (state && state !== 'All India') params.set('state', state);
    router.push(`/?${params.toString()}`);
  };

  const selectStyle = {
    width: '100%',
    padding: '8px 10px',
    fontSize: '13px',
    borderRadius: '4px',
    border: '2px solid rgba(255,255,255,0.3)',
    background: 'rgba(255,255,255,0.95)',
    color: '#000',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #004085 0%, #001f3f 100%)',
      color: '#fff',
      padding: '18px 20px',
      borderRadius: '6px',
      marginBottom: '20px',
      boxShadow: '0 4px 12px rgba(0,64,133,0.3)',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <span style={{ fontSize: '22px' }}>🎯</span>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#ffcc00', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Student Eligibility & Age Calculator
        </h3>
      </div>

      <form onSubmit={handleCheck} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', alignItems: 'end' }}>
        {/* Date of Birth */}
        <div>
          <label style={{ display: 'block', fontSize: '11px', marginBottom: '4px', fontWeight: 'bold', color: '#cce5ff' }}>
            📅 Date of Birth:
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            style={{
              ...selectStyle,
              colorScheme: 'light',
            }}
          />
        </div>

        {/* Qualification */}
        <div>
          <label style={{ display: 'block', fontSize: '11px', marginBottom: '4px', fontWeight: 'bold', color: '#cce5ff' }}>
            🎓 Qualification:
          </label>
          <select value={qual} onChange={(e) => setQual(e.target.value)} style={selectStyle}>
            <option value="">All Qualifications</option>
            <option value="10th Pass">10th Pass</option>
            <option value="12th Pass">12th Pass</option>
            <option value="Degree">Any Graduation Degree</option>
            <option value="B.Tech">B.Tech / B.E.</option>
            <option value="ITI">ITI / Diploma</option>
          </select>
        </div>

        {/* State */}
        <div>
          <label style={{ display: 'block', fontSize: '11px', marginBottom: '4px', fontWeight: 'bold', color: '#cce5ff' }}>
            📍 State:
          </label>
          <select value={state} onChange={(e) => setState(e.target.value)} style={selectStyle}>
            <option value="All India">All India (Central)</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Telangana">Telangana</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Bihar">Bihar</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Kerala">Kerala</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #28a745, #20c997)',
              color: '#fff',
              border: 'none',
              padding: '9px 14px',
              fontSize: '13px',
              fontWeight: 'bold',
              borderRadius: '4px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Check Now 🚀
          </button>
        </div>
      </form>

      {/* Result Panel */}
      {result && (
        <div style={{ marginTop: '14px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', padding: '14px', border: '1px solid rgba(255,255,255,0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
              🎂 Your Age: <span style={{ color: '#ffcc00', fontSize: '18px' }}>{result.age} Years</span>
            </span>
            <span style={{ fontSize: '12px', background: result.eligible.length > 0 ? '#28a745' : '#dc3545', padding: '3px 10px', borderRadius: '3px', fontWeight: 'bold' }}>
              Eligible for {result.eligible.length} / {result.eligible.length + result.notEligible.length} Exam Categories
            </span>
          </div>

          {result.eligible.length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#90ee90', margin: '0 0 4px 0' }}>✅ Eligible For:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {result.eligible.map((e, i) => (
                  <span key={i} style={{ background: 'rgba(40,167,69,0.3)', border: '1px solid rgba(40,167,69,0.5)', padding: '2px 8px', borderRadius: '3px', fontSize: '11px', fontWeight: 'bold' }}>
                    {e}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.notEligible.length > 0 && (
            <div>
              <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#ffb3b3', margin: '0 0 4px 0' }}>⚠️ Age Limit Crossed:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {result.notEligible.map((e, i) => (
                  <span key={i} style={{ background: 'rgba(220,53,69,0.2)', border: '1px solid rgba(220,53,69,0.4)', padding: '2px 8px', borderRadius: '3px', fontSize: '11px', color: '#ffb3b3' }}>
                    {e}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p style={{ fontSize: '11px', color: '#cce5ff', marginTop: '10px', marginBottom: 0 }}>
            💡 Note: OBC candidates get +3 years and SC/ST get +5 years age relaxation in most Central Govt exams.
          </p>
        </div>
      )}
    </div>
  );
}
