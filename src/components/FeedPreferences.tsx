"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FeedPreferencesProps {
  initialJobPref: string;
  initialStatePref: string | null;
}

const INDIAN_STATES = [
  "All India",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function FeedPreferences({ initialJobPref, initialStatePref }: FeedPreferencesProps) {
  const router = useRouter();
  const [jobPref, setJobPref] = useState(initialJobPref || "ALL");
  const [statePref, setStatePref] = useState(initialStatePref || "All India");
  const [loading, setLoading] = useState(false);

  const updatePreference = async (newJobPref: string, newStatePref: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/preference", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobPreference: newJobPref,
          statePreference: newStatePref === "All India" ? null : newStatePref,
        }),
      });

      if (res.ok) {
        router.refresh(); // Refresh the server component feed
      }
    } catch (error) {
      console.error("Failed to update preference", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJobPrefChange = (pref: string) => {
    setJobPref(pref);
    updatePreference(pref, statePref);
  };

  const handleStatePrefChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVal = e.target.value;
    setStatePref(newVal);
    updatePreference(jobPref, newVal);
  };

  return (
    <div style={{ background: "var(--bg-card)", padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--border-color)", marginBottom: "2rem" }}>
      <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", fontWeight: 700 }}>Personalize Your Feed</h3>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "center" }}>
        {/* Job Type Toggle */}
        <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "0.4rem" }}>
          <button 
            onClick={() => handleJobPrefChange("ALL")}
            style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: 600, background: jobPref === "ALL" ? "var(--color-primary)" : "transparent", color: jobPref === "ALL" ? "#fff" : "var(--text-muted)", transition: "all 0.2s" }}
            disabled={loading}
          >
            All Jobs
          </button>
          <button 
            onClick={() => handleJobPrefChange("GOVERNMENT")}
            style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: 600, background: jobPref === "GOVERNMENT" ? "var(--color-primary)" : "transparent", color: jobPref === "GOVERNMENT" ? "#fff" : "var(--text-muted)", transition: "all 0.2s" }}
            disabled={loading}
          >
            🏛️ Govt Only
          </button>
          <button 
            onClick={() => handleJobPrefChange("PRIVATE")}
            style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: 600, background: jobPref === "PRIVATE" ? "var(--color-secondary)" : "transparent", color: jobPref === "PRIVATE" ? "#fff" : "var(--text-muted)", transition: "all 0.2s" }}
            disabled={loading}
          >
            🚀 IT / Private
          </button>
        </div>

        {/* State Dropdown */}
        <div style={{ flex: "1 1 200px" }}>
          <select 
            value={statePref}
            onChange={handleStatePrefChange}
            disabled={loading}
            style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "12px", background: "var(--bg-card)", color: "var(--text-main)", border: "1px solid var(--border-color)", outline: "none", cursor: "pointer", fontSize: "1rem" }}
          >
            {INDIAN_STATES.map((state) => (
              <option key={state} value={state}>{state === "All India" ? "📍 All India (Show Everything)" : `📍 ${state}`}</option>
            ))}
          </select>
        </div>
      </div>
      {loading && <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "1rem" }}>Updating feed...</p>}
    </div>
  );
}
