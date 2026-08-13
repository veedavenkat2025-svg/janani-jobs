import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { toggleSaveJob } from "../actions";
import Link from "next/link";
import ShareButton from "./ShareButton";

export default async function JobDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  const job = await prisma.job.findUnique({
    where: { id: params.id }
  });

  if (!job) notFound();

  const session = await getServerSession(authOptions);
  let isSaved = false;
  let userQualification = null;

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (user) {
      userQualification = user.qualification;
      const saved = await prisma.savedJob.findUnique({
        where: {
          userId_jobId: { userId: user.id, jobId: job.id }
        }
      });
      isSaved = !!saved;
    }
  }

  // Simple Eligibility Logic
  let isEligible = false;
  const qualRank = { "10th Pass": 1, "12th Pass": 2, "Diploma": 3, "Graduation": 4, "Post-Graduation": 5 };
  
  if (userQualification && job.qualification) {
    const userRank = qualRank[userQualification as keyof typeof qualRank] || 0;
    const jobRank = qualRank[job.qualification as keyof typeof qualRank] || 0;
    isEligible = userRank >= jobRank;
  }

  return (
    <main style={{ background: "#fff", color: "#000", fontFamily: "Arial, sans-serif", padding: "20px 0" }}>
      <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 15px" }}>
        
        <Link href="/" style={{ color: "#004085", fontWeight: "bold", textDecoration: "none", display: "inline-block", marginBottom: "15px", fontSize: "14px" }}>
          ← Back to Home
        </Link>

        {/* FreeJobAlert Classic Job Box */}
        <div style={{ border: "2px solid #004085", background: "#fff" }}>
          
          {/* Header Bar */}
          <div style={{ background: "#004085", color: "#fff", padding: "12px", textAlign: "center" }}>
            <h1 style={{ fontSize: "20px", margin: 0, fontWeight: "bold", textTransform: "uppercase" }}>
              {job.organization}
            </h1>
            <h2 style={{ fontSize: "16px", margin: "5px 0 0 0", color: "#ffcc00", fontWeight: "normal" }}>
              {job.title}
            </h2>
          </div>

          <div style={{ padding: "15px" }}>
            
            {/* Meta Stats */}
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ccc", paddingBottom: "10px", marginBottom: "15px", fontSize: "14px" }}>
              <span><strong>Post Date:</strong> {job.postedAt.toLocaleDateString()}</span>
              <span><strong>Category:</strong> <span style={{ color: "#cc0000", fontWeight: "bold" }}>{job.category}</span></span>
              <span><strong>State/Region:</strong> {job.state || job.location || "Central"}</span>
            </div>

            {/* Student Eligibility Alert Banner */}
            {userQualification && job.qualification && (
              <div style={{ 
                padding: "10px 15px", 
                marginBottom: "15px", 
                border: `1px solid ${isEligible ? "#28a745" : "#dc3545"}`, 
                background: isEligible ? "#d4edda" : "#f8d7da",
                color: isEligible ? "#155724" : "#721c24",
                fontSize: "14px",
                fontWeight: "bold"
              }}>
                {isEligible ? "✅ You meet the qualification criteria for this post!" : "⚠️ Higher qualification required for this post."}
                <span style={{ fontWeight: "normal", display: "block", fontSize: "12px", marginTop: "3px" }}>
                  Required: {job.qualification} | Your Profile: {userQualification}
                </span>
              </div>
            )}

            {/* Information Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc", marginBottom: "20px" }}>
              <tbody>
                <tr>
                  <td colSpan={2} style={{ background: "#f0f8ff", padding: "10px", fontWeight: "bold", color: "#004085", fontSize: "15px", borderBottom: "1px solid #ccc" }}>
                    Brief Information
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ padding: "10px", fontSize: "14px", borderBottom: "1px solid #ccc", lineHeight: "1.6" }}>
                    {job.description}
                  </td>
                </tr>

                {/* Important Dates & Fees */}
                <tr>
                  <td style={{ width: "50%", verticalAlign: "top", borderRight: "1px solid #ccc", borderBottom: "1px solid #ccc", padding: "10px" }}>
                    <p style={{ color: "#cc0000", fontWeight: "bold", marginTop: 0, marginBottom: "8px", fontSize: "14px" }}>
                      Important Dates
                    </p>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", lineHeight: "1.8" }}>
                      <li><strong>Posted Date:</strong> {job.postedAt.toLocaleDateString()}</li>
                      {job.deadline && (
                        <li style={{ color: "#cc0000", fontWeight: "bold" }}>
                          <strong>Last Date to Apply:</strong> {new Date(job.deadline).toLocaleDateString()}
                        </li>
                      )}
                    </ul>
                  </td>
                  <td style={{ width: "50%", verticalAlign: "top", borderBottom: "1px solid #ccc", padding: "10px" }}>
                    <p style={{ color: "#004085", fontWeight: "bold", marginTop: 0, marginBottom: "8px", fontSize: "14px" }}>
                      Educational Qualification
                    </p>
                    <p style={{ fontSize: "13px", margin: 0, fontWeight: "bold" }}>
                      🎓 {job.qualification || "As per official notification"}
                    </p>
                    <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
                      Salary: {job.salary || "As per Govt Rules"}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Important Links Box */}
            <div style={{ border: "1px solid #004085", marginBottom: "20px" }}>
              <div style={{ background: "#004085", color: "#fff", padding: "8px 12px", fontWeight: "bold", fontSize: "15px", textAlign: "center" }}>
                Important Official Links
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px", borderBottom: "1px solid #eee", fontSize: "14px", fontWeight: "bold", width: "50%" }}>
                      Online Application Link
                    </td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #eee", textAlign: "center" }}>
                      <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" style={{ background: "#28a745", color: "#fff", padding: "6px 15px", fontWeight: "bold", textDecoration: "none", borderRadius: "3px", fontSize: "13px", display: "inline-block" }}>
                        Apply Online Click Here 🔗
                      </a>
                    </td>
                  </tr>
                  {job.sourceUrl && (
                    <tr>
                      <td style={{ padding: "10px", fontSize: "14px", fontWeight: "bold" }}>
                        Official Website / Notification
                      </td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <a href={job.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ background: "#004085", color: "#fff", padding: "6px 15px", fontWeight: "bold", textDecoration: "none", borderRadius: "3px", fontSize: "13px", display: "inline-block" }}>
                          Official Website 🌐
                        </a>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
              <ShareButton title={job.title} text={`Check out this ${job.organization} job notification:`} />
              
              <form action={async () => {
                "use server";
                await toggleSaveJob(job.id);
              }}>
                <button type="submit" style={{ background: "#ffc107", color: "#000", border: "1px solid #e0a800", padding: "8px 15px", fontWeight: "bold", cursor: "pointer", borderRadius: "3px", fontSize: "13px" }}>
                  {isSaved ? "★ Saved in Profile" : "☆ Save Job"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
