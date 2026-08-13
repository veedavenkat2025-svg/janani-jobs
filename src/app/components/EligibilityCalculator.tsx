'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EligibilityCalculator() {
  const router = useRouter();
  const [qual, setQual] = useState('Any Qualification');
  const [state, setState] = useState('All India');
  const [birthYear, setBirthYear] = useState('');
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthYear) {
      const currentYear = new Date().getFullYear();
      const age = currentYear - parseInt(birthYear);
      setCalculatedAge(age > 0 && age < 100 ? age : null);
    }
    
    // Build query URL
    const params = new URLSearchParams();
    if (qual !== 'Any Qualification') params.set('qual', qual);
    if (state !== 'All India') params.set('state', state);

    router.push(`/?${params.toString()}`);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #004085 0%, #002752 100%)',
      color: '#fff',
      padding: '15px 20px',
      borderRadius: '6px',
      marginBottom: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '20px' }}>🎯</span>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#ffcc00', textTransform: 'uppercase' }}>
          Student Eligibility & Age Calculator
        </h3>
      </div>

      <form onSubmit={handleCheck} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-end' }}>
        <div style={{ flex: '1 1 150px' }}>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', fontWeight: 'bold', color: '#e0e0e0' }}>
            Birth Year:
          </label>
          <input
            type="number"
            placeholder="e.g. 2002"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 10px',
              fontSize: '13px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              color: '#000'
            }}
          />
        </div>

        <div style={{ flex: '1 1 160px' }}>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', fontWeight: 'bold', color: '#e0e0e0' }}>
            Your Qualification:
          </label>
          <select
            value={qual}
            onChange={(e) => setQual(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 10px',
              fontSize: '13px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              color: '#000'
            }}
          >
            <option value="Any Qualification">Select Qualification</option>
            <option value="10th Pass">10th Pass</option>
            <option value="12th Pass">12th Pass</option>
            <option value="Any Degree">Any Graduation Degree</option>
            <option value="B.Tech">B.Tech / B.E.</option>
            <option value="ITI / Diploma">ITI / Diploma</option>
          </select>
        </div>

        <div style={{ flex: '1 1 150px' }}>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', fontWeight: 'bold', color: '#e0e0e0' }}>
            Preferred State:
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 10px',
              fontSize: '13px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              color: '#000'
            }}
          >
            <option value="All India">All India (Central)</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Telangana">Telangana</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            background: '#28a745',
            color: '#fff',
            border: 'none',
            padding: '8px 18px',
            fontSize: '13px',
            fontWeight: 'bold',
            borderRadius: '4px',
            cursor: 'pointer',
            flex: '0 0 auto'
          }}
        >
          Check My Jobs 🚀
        </button>
      </form>

      {calculatedAge !== null && (
        <div style={{ marginTop: '10px', background: 'rgba(255, 255, 255, 0.15)', padding: '6px 12px', borderRadius: '4px', fontSize: '12px' }}>
          💡 Your current age is <strong>{calculatedAge} Years</strong>. Most Govt General post limits range from 18 to 30/32 years.
        </div>
      )}
    </div>
  );
}
