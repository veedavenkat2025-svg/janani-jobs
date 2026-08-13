'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StateFilterDropdown({ currentState = 'All India', currentQual = '' }: { currentState?: string, currentQual?: string }) {
  const router = useRouter();
  const [state, setState] = useState(currentState);
  const [qual, setQual] = useState(currentQual || 'ALL');

  const handleFilter = (selectedState: string, selectedQual: string) => {
    setState(selectedState);
    setQual(selectedQual);

    const params = new URLSearchParams();
    if (selectedState && selectedState !== 'All India') params.set('state', selectedState);
    if (selectedQual && selectedQual !== 'ALL') params.set('qual', selectedQual);

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="sidebar-box" style={{ background: '#f8f9fa', border: '1px solid #004085' }}>
      <div className="sidebar-header" style={{ background: '#004085', color: '#fff', padding: '8px 12px', fontWeight: 'bold', fontSize: '14px' }}>
        Smart Filter Portal 🎯
      </div>
      <div style={{ padding: '12px' }}>
        
        {/* State Dropdown */}
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#004085', marginBottom: '4px' }}>
          📍 Select State:
        </label>
        <select
          value={state}
          onChange={(e) => handleFilter(e.target.value, qual)}
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '13px',
            borderRadius: '4px',
            border: '1px solid #004085',
            background: '#fff',
            color: '#000',
            fontWeight: 'bold',
            marginBottom: '12px',
            cursor: 'pointer'
          }}
        >
          <option value="All India">All India (Central Jobs)</option>
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

        {/* Qualification Dropdown */}
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#004085', marginBottom: '4px' }}>
          🎓 Select Qualification:
        </label>
        <select
          value={qual}
          onChange={(e) => handleFilter(state, e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '13px',
            borderRadius: '4px',
            border: '1px solid #004085',
            background: '#fff',
            color: '#000',
            fontWeight: 'bold',
            marginBottom: '8px',
            cursor: 'pointer'
          }}
        >
          <option value="ALL">All Qualifications</option>
          <option value="10th Pass">10th Pass</option>
          <option value="12th Pass">12th Pass</option>
          <option value="Degree">Any Degree</option>
          <option value="B.Tech">B.Tech / B.E.</option>
          <option value="ITI">ITI / Diploma</option>
        </select>

        {(state !== 'All India' || qual !== 'ALL') && (
          <button
            onClick={() => handleFilter('All India', 'ALL')}
            style={{
              width: '100%',
              marginTop: '8px',
              background: '#cc0000',
              color: '#fff',
              border: 'none',
              padding: '6px',
              fontSize: '12px',
              fontWeight: 'bold',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear Filters ✕
          </button>
        )}

      </div>
    </div>
  );
}
