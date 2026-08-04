import * as cheerio from "cheerio";
import { PrismaClient } from "@prisma/client";

// In a standalone script, we instantiate PrismaClient directly
const prisma = new PrismaClient();

// Target URL for Govt Jobs (hypothetical/example URL)
const TARGET_URL = "https://example.com/govt-jobs";

async function scrapeGovtJobs() {
  console.log(`[Scraper] Starting job scrape from ${TARGET_URL}...`);
  
  try {
    // 1. Fetch the HTML
    // Note: In a real environment, we'd fetch the actual URL.
    // For this demo, we'll simulate a fetched HTML response from a job board
    // since many govt sites block automated scripts without proxies.
    
    // const response = await fetch(TARGET_URL);
    // const html = await response.text();
    
    const simulatedHTML = `
      <div class="job-listing">
        <h2 class="title">UPSC Civil Services Examination 2026</h2>
        <div class="org">Union Public Service Commission</div>
        <div class="desc">Recruitment for IAS, IPS, IFS, and other allied services.</div>
        <div class="salary">Level 10 Pay Matrix</div>
        <div class="deadline">2026-11-20</div>
        <a class="apply" href="https://upsc.gov.in">Apply Here</a>
      </div>
      <div class="job-listing">
        <h2 class="title">RRB NTPC Recruitment 2026</h2>
        <div class="org">Railway Recruitment Board</div>
        <div class="desc">Non-Technical Popular Categories recruitment for various zones across India.</div>
        <div class="salary">₹29,200 - ₹35,400</div>
        <div class="deadline">2026-12-05</div>
        <a class="apply" href="https://indianrailways.gov.in">Apply Here</a>
      </div>
      <div class="job-listing">
        <h2 class="title">SBI Clerk 2026 (Junior Associates)</h2>
        <div class="org">State Bank of India</div>
        <div class="desc">Recruitment of Junior Associates (Customer Support & Sales) in State Bank of India.</div>
        <div class="salary">₹19,900 - ₹47,920</div>
        <div class="deadline">2026-10-25</div>
        <a class="apply" href="https://sbi.co.in/careers">Apply Here</a>
      </div>
    `;

    // 2. Load HTML into Cheerio for parsing
    const $ = cheerio.load(simulatedHTML);
    const jobsToInsert: any[] = [];

    // 3. Extract data using CSS selectors
    $('.job-listing').each((index, element) => {
      const title = $(element).find('.title').text().trim();
      const organization = $(element).find('.org').text().trim();
      const description = $(element).find('.desc').text().trim();
      const salary = $(element).find('.salary').text().trim();
      const deadlineStr = $(element).find('.deadline').text().trim();
      const applyUrl = $(element).find('.apply').attr('href') || '#';

      jobsToInsert.push({
        title,
        organization,
        type: "GOVERNMENT", // Tagged explicitly by our govt scraper
        description,
        salary,
        applyUrl,
        deadline: new Date(deadlineStr),
      });
    });

    console.log(`[Scraper] Successfully parsed ${jobsToInsert.length} jobs.`);

    // 4. Save to Database using Prisma
    let insertedCount = 0;
    for (const job of jobsToInsert) {
      // Check if job already exists to avoid duplicates (using title + org as a simple unique key)
      const existingJob = await prisma.job.findFirst({
        where: {
          title: job.title,
          organization: job.organization
        }
      });

      if (!existingJob) {
        await prisma.job.create({
          data: job
        });
        insertedCount++;
        console.log(`[Database] Inserted new job: ${job.title}`);
      } else {
        console.log(`[Database] Skipped existing job: ${job.title}`);
      }
    }

    console.log(`[Scraper] Complete! Added ${insertedCount} new jobs to the database.`);

  } catch (error) {
    console.error(`[Scraper] Error during scraping:`, error);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the scraper
scrapeGovtJobs();
