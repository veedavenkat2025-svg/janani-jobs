import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Database with realistic Job Data...");

  const mockJobs = [
    // LATEST NOTIFICATIONS
    { title: "SSC GD Constable 2026 Notification Released", organization: "Staff Selection Commission", type: "GOVERNMENT", category: "NEW_UPDATE", location: "All India", state: "Central", qualification: "10th Pass", applyUrl: "https://ssc.gov.in" },
    { title: "UPSC NDA & NA (I) 2026 Apply Online", organization: "UPSC", type: "GOVERNMENT", category: "NEW_UPDATE", location: "All India", state: "Central", qualification: "12th Pass", applyUrl: "https://upsc.gov.in" },
    { title: "RRB Assistant Loco Pilot (ALP) 2026", organization: "Railway Recruitment Board", type: "GOVERNMENT", category: "NEW_UPDATE", location: "All India", state: "Central", qualification: "ITI / Diploma", applyUrl: "#" },
    { title: "SBI Probationary Officer (PO) 2026", organization: "State Bank of India", type: "GOVERNMENT", category: "NEW_UPDATE", location: "All India", state: "Central", qualification: "Any Degree", applyUrl: "#" },
    { title: "TSPSC Group 1 Notification 2026", organization: "TSPSC", type: "GOVERNMENT", category: "NEW_UPDATE", location: "Telangana", state: "Telangana", qualification: "Any Degree", applyUrl: "https://tspsc.gov.in" },
    { title: "APPSC Group 2 Apply Online", organization: "APPSC", type: "GOVERNMENT", category: "NEW_UPDATE", location: "Andhra Pradesh", state: "Andhra Pradesh", qualification: "Any Degree", applyUrl: "https://psc.ap.gov.in" },
    { title: "India Post GDS Recruitment 2026 (30,000+ Posts)", organization: "India Post", type: "GOVERNMENT", category: "NEW_UPDATE", location: "All India", state: "Central", qualification: "10th Pass", applyUrl: "#" },
    { title: "LIC Assistant Recruitment 2026", organization: "LIC of India", type: "GOVERNMENT", category: "NEW_UPDATE", location: "All India", state: "Central", qualification: "Any Degree", applyUrl: "#" },
    
    // ADMIT CARDS
    { title: "SSC CHSL Tier-1 Admit Card 2026", organization: "SSC", type: "GOVERNMENT", category: "ADMIT_CARD", location: "All India", state: "Central", qualification: "12th Pass", applyUrl: "#" },
    { title: "UPSC Civil Services Prelims e-Admit Card", organization: "UPSC", type: "GOVERNMENT", category: "ADMIT_CARD", location: "All India", state: "Central", qualification: "Any Degree", applyUrl: "#" },
    { title: "IBPS Clerk Prelims Call Letter Download", organization: "IBPS", type: "GOVERNMENT", category: "ADMIT_CARD", location: "All India", state: "Central", qualification: "Any Degree", applyUrl: "#" },
    { title: "TS TET 2026 Hall Ticket Available", organization: "TS Govt", type: "GOVERNMENT", category: "ADMIT_CARD", location: "Telangana", state: "Telangana", qualification: "B.Ed", applyUrl: "#" },
    { title: "AP Police Constable Physical Test Call Letter", organization: "AP Police", type: "GOVERNMENT", category: "ADMIT_CARD", location: "Andhra Pradesh", state: "Andhra Pradesh", qualification: "12th Pass", applyUrl: "#" },
    { title: "Air Force AFCAT (1) 2026 Admit Card", organization: "Indian Air Force", type: "GOVERNMENT", category: "ADMIT_CARD", location: "All India", state: "Central", qualification: "Degree/B.Tech", applyUrl: "#" },
    { title: "CTET July 2026 Admit Card Download", organization: "CBSE", type: "GOVERNMENT", category: "ADMIT_CARD", location: "All India", state: "Central", qualification: "B.Ed / D.El.Ed", applyUrl: "#" },

    // RESULTS
    { title: "SSC CGL Final Result & Cutoff Marks", organization: "SSC", type: "GOVERNMENT", category: "RESULT", location: "All India", state: "Central", qualification: "Any Degree", applyUrl: "#" },
    { title: "UPSC NDA (II) Final Result 2026", organization: "UPSC", type: "GOVERNMENT", category: "RESULT", location: "All India", state: "Central", qualification: "12th Pass", applyUrl: "#" },
    { title: "SBI Clerk Prelims Result Released", organization: "SBI", type: "GOVERNMENT", category: "RESULT", location: "All India", state: "Central", qualification: "Any Degree", applyUrl: "#" },
    { title: "TSPSC Group 4 Merit List & Cutoff", organization: "TSPSC", type: "GOVERNMENT", category: "RESULT", location: "Telangana", state: "Telangana", qualification: "Any Degree", applyUrl: "#" },
    { title: "APPSC Group 1 Mains Final Result", organization: "APPSC", type: "GOVERNMENT", category: "RESULT", location: "Andhra Pradesh", state: "Andhra Pradesh", qualification: "Any Degree", applyUrl: "#" },
    { title: "Railway RRB Group D Final Empanelment List", organization: "RRB", type: "GOVERNMENT", category: "RESULT", location: "All India", state: "Central", qualification: "10th/ITI", applyUrl: "#" },
    { title: "NTA UGC NET June 2026 Scorecard", organization: "NTA", type: "GOVERNMENT", category: "RESULT", location: "All India", state: "Central", qualification: "PG Degree", applyUrl: "#" },
  ].map(job => ({ ...job, description: "Detailed notification and official PDF link available on the website." }));

  let insertedCount = 0;
  for (const job of mockJobs) {
    const exists = await prisma.job.findFirst({ where: { title: job.title } });
    if (!exists) {
      await prisma.job.create({ data: job });
      insertedCount++;
    }
  }

  console.log(`Successfully inserted ${insertedCount} new jobs!`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
