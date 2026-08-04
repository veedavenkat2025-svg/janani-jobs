import * as cheerio from "cheerio";
import { prisma } from "./prisma";

export async function runScraper() {
  console.log(`[Scraper API] Starting scheduled job scrape...`);
  
  try {
    // In production, fetch(TARGET_URL)
    const simulatedHTML = `
      <div class="job-listing">
        <h2 class="title">Staff Selection Commission (CGL) 2026</h2>
        <div class="org">Staff Selection Commission</div>
        <div class="desc">Combined Graduate Level Examination for Group B and Group C posts.</div>
        <div class="salary">Level 8 Pay Matrix</div>
        <div class="deadline">2026-09-15</div>
        <a class="apply" href="https://ssc.nic.in">Apply Here</a>
      </div>
      <div class="job-listing">
        <h2 class="title">IBPS PO Recruitment 2026</h2>
        <div class="org">Institute of Banking Personnel Selection</div>
        <div class="desc">Probationary Officers recruitment across 11 participating banks.</div>
        <div class="salary">₹36,000 - ₹63,840</div>
        <div class="deadline">2026-08-30</div>
        <a class="apply" href="https://ibps.in">Apply Here</a>
      </div>
    `;

    const $ = cheerio.load(simulatedHTML);
    const jobsToInsert: any[] = [];

    $('.job-listing').each((index, element) => {
      jobsToInsert.push({
        title: $(element).find('.title').text().trim(),
        organization: $(element).find('.org').text().trim(),
        type: "GOVERNMENT", 
        description: $(element).find('.desc').text().trim(),
        salary: $(element).find('.salary').text().trim(),
        applyUrl: $(element).find('.apply').attr('href') || '#',
        deadline: new Date($(element).find('.deadline').text().trim()),
      });
    });

    let insertedCount = 0;
    for (const job of jobsToInsert) {
      const existingJob = await prisma.job.findFirst({
        where: { title: job.title, organization: job.organization }
      });

      if (!existingJob) {
        await prisma.job.create({ data: job });
        insertedCount++;
      }
    }

    return { success: true, inserted: insertedCount, message: `Successfully parsed and inserted ${insertedCount} jobs.` };
  } catch (error: any) {
    console.error(`[Scraper API] Error:`, error);
    return { success: false, error: error.message };
  }
}
