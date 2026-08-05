import * as cheerio from "cheerio";
import Parser from "rss-parser";
import { prisma } from "./prisma";

// Type definition for parsed jobs
type ParsedJob = {
  title: string;
  organization: string;
  type: string;
  description: string;
  salary: string;
  qualification: string;
  applyUrl: string;
  deadline: Date;
};

/**
 * Scrapes UPSC (Union Public Service Commission)
 * UPSC provides an official RSS feed that we can reliably parse.
 */
async function scrapeUPSC(): Promise<ParsedJob[]> {
  console.log(`[Scraper] Fetching UPSC jobs...`);
  const jobs: ParsedJob[] = [];
  try {
    const response = await fetch("https://upsc.gov.in/rss.php");
    const xml = await response.text();
    
    // Government RSS feeds often have malformed XML (unescaped '&'). 
    // We use Regex to safely extract titles and links instead of a strict XML parser.
    const itemRegex = /<item>[\s\S]*?<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>[\s\S]*?<link>(.*?)<\/link>[\s\S]*?<\/item>/g;
    
    let match;
    while ((match = itemRegex.exec(xml)) !== null) {
      const title = match[1].trim();
      const link = match[2].trim();
      
      jobs.push({
        title: title.substring(0, 190),
        organization: "Union Public Service Commission (UPSC)",
        type: "GOVERNMENT",
        description: `Official Notification: ${title}`,
        salary: "As per Govt Norms",
        qualification: "Graduation", // UPSC almost always requires Graduation
        applyUrl: link,
        deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      });
    }
  } catch (error) {
    console.error(`[Scraper] UPSC Error:`, error);
  }
  return jobs;
}

/**
 * Scrapes SSC (Staff Selection Commission)
 * SSC does not provide an RSS feed, so we parse their HTML directly.
 */
async function scrapeSSC(): Promise<ParsedJob[]> {
  console.log(`[Scraper] Fetching SSC jobs...`);
  const jobs: ParsedJob[] = [];
  try {
    // We fetch the main SSC website HTML
    const response = await fetch("https://ssc.gov.in/", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      }
    });
    
    const html = await response.text();
    const $ = cheerio.load(html);

    // SSC usually posts updates in lists or tables with links
    // We will look for standard anchor tags inside content areas
    $('a').each((index, element) => {
      const text = $(element).text().trim();
      const href = $(element).attr('href') || '';
      
      // Filter for links that sound like job notices (Examination, Recruitment, Notice)
      if (text.length > 20 && (text.toLowerCase().includes('examination') || text.toLowerCase().includes('notice') || text.toLowerCase().includes('recruitment'))) {
        
        let qualification = "12th Pass"; // Default fallback for SSC
        if (text.toLowerCase().includes('cgl') || text.toLowerCase().includes('graduate')) {
          qualification = "Graduation";
        } else if (text.toLowerCase().includes('mts') || text.toLowerCase().includes('multi tasking')) {
          qualification = "10th Pass";
        } else if (text.toLowerCase().includes('chsl') || text.toLowerCase().includes('10+2')) {
          qualification = "12th Pass";
        } else if (text.toLowerCase().includes('je') || text.toLowerCase().includes('junior engineer')) {
          qualification = "Diploma";
        }

        let fullLink = href;
        if (href.startsWith('/')) {
            fullLink = `https://ssc.gov.in${href}`;
        }

        jobs.push({
          title: text.substring(0, 190),
          organization: "Staff Selection Commission (SSC)",
          type: "GOVERNMENT",
          description: `Official SSC Notice: ${text}`,
          salary: "As per Govt Norms",
          qualification,
          applyUrl: fullLink,
          deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
        });
      }
    });
    
    // We only take the top 10 most recent notices to avoid flooding
    return jobs.slice(0, 10);
  } catch (error) {
    console.error(`[Scraper] SSC Error:`, error);
  }
  return jobs;
}

/**
 * Scrapes Private Sector Jobs (Startups, Remote Tech)
 * We use the public Remotive API to fetch real remote software jobs.
 */
async function scrapePrivateJobs(): Promise<ParsedJob[]> {
  console.log(`[Scraper] Fetching Private/Startup jobs...`);
  const jobs: ParsedJob[] = [];
  try {
    // Fetch Software Dev remote jobs, limit to top 15 most recent
    const response = await fetch("https://remotive.com/api/remote-jobs?category=software-dev&limit=15");
    const data = await response.json();
    
    if (data && data.jobs) {
      data.jobs.slice(0, 15).forEach((job: any) => {
        // Remotive jobs don't have strict deadlines, assume 30 days from now
        jobs.push({
          title: job.title.substring(0, 190),
          organization: job.company_name,
          type: "PRIVATE",
          description: `Remote Opportunity at ${job.company_name}. Category: ${job.category}`,
          salary: job.salary || "Competitive",
          qualification: "Graduation", // Default for software jobs
          applyUrl: job.url,
          deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
        });
      });
    }
  } catch (error) {
    console.error(`[Scraper] Private Jobs Error:`, error);
  }
  return jobs;
}

/**
 * Main Engine that aggregates all modular scrapers
 */
export async function runScraper() {
  console.log(`[Scraper API] Starting scheduled job scrape...`);
  
  try {
    const upscJobs = await scrapeUPSC();
    const sscJobs = await scrapeSSC();
    const privateJobs = await scrapePrivateJobs();
    
    const allJobs = [...upscJobs, ...sscJobs, ...privateJobs];
    let insertedCount = 0;

    // Fetch all users for notifications
    const allUsers = await prisma.user.findMany({ select: { id: true, email: true } });

    for (const job of allJobs) {
      // Check if job already exists to prevent duplicates
      const existingJob = await prisma.job.findFirst({
        where: { title: job.title, organization: job.organization }
      });

      if (!existingJob) {
        const newJob = await prisma.job.create({ data: job });
        insertedCount++;

        // --- EMAIL & NOTIFICATION ENGINE ---
        // Dynamically set title based on job type
        const notifTitle = job.type === 'GOVERNMENT' ? "🔥 New Govt Job Alert!" : "🚀 New Private Tech Job!";
        
        // Bulk Create Notifications for Performance
        const notificationsToInsert = allUsers.map((user) => ({
          userId: user.id,
          title: notifTitle,
          message: `${job.title} at ${job.organization} was just posted. Apply before it closes!`,
          link: `/jobs/${newJob.id}`,
        }));

        if (notificationsToInsert.length > 0) {
          await prisma.notification.createMany({
            data: notificationsToInsert,
            skipDuplicates: true,
          });
        }
        
        // Log Email Alerts
        console.log(`[EMAIL MOCK] Dispatched email alerts for job ${newJob.id} to ${allUsers.length} users.`);
      }
    }

    return { success: true, inserted: insertedCount, message: `Successfully scraped and inserted ${insertedCount} live jobs, and sent notifications.` };
  } catch (error: any) {
    console.error(`[Scraper API] Global Error:`, error);
    return { success: false, error: error.message };
  }
}
