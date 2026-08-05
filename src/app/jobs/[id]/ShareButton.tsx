"use client";

export default function ShareButton({ title, text }: { title: string, text: string }) {
  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    // If Web Share API is available (Mobile/Modern browsers)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${title} - ${url}`);
        alert("Job link copied to clipboard!");
      } catch (err) {
        alert("Failed to copy link.");
      }
    }
  };

  return (
    <button onClick={handleShare} className="btn btn-secondary" style={{ padding: "1rem 2rem", fontSize: "1.125rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span>↗️</span> Forward
    </button>
  );
}
