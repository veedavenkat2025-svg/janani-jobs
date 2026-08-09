import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as cheerio from 'cheerio';

// This is a secure background route triggered by Vercel Cron
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const scrapedJobs: any[] = [];

  try {
    // 1. Scrape SSC (Staff Selection Commission)
    try {
      const sscResponse = await fetch('https://ssc.gov.in/', { next: { revalidate: 0 } });
      const sscHtml = await sscResponse.text();
      const $ssc = cheerio.load(sscHtml);
      
      // Look for latest news links (This selector is highly dependent on actual SSC structure, using a generic approach)
      $ssc('a').each((i, el) => {
        const text = $ssc(el).text().trim();
        const href = $ssc(el).attr('href');
        
        // Filter for valid notification links
        if (text && text.toLowerCase().includes('notice') && href) {
          scrapedJobs.push({
            title: `SSC Update: ${text.substring(0, 100)}`,
            organization: 'Staff Selection Commission (SSC)',
            type: 'GOVERNMENT',
            category: 'NEW_UPDATE', // Forces it into the "Latest Notifications" table
            location: 'All India',
            state: 'Central',
            qualification: 'Check Notification',
            applyUrl: href.startsWith('http') ? href : `https://ssc.gov.in${href}`,
            // Optional fields
            description: 'Latest update automatically fetched from official SSC website.',
          });
        }
      });
    } catch (e) {
      console.error("SSC Scrape failed", e);
    }

    // 2. Scrape UPSC (Union Public Service Commission)
    try {
      const upscResponse = await fetch('https://upsc.gov.in/whats-new', { next: { revalidate: 0 } });
      const upscHtml = await upscResponse.text();
      const $upsc = cheerio.load(upscHtml);
      
      $upsc('.view-content a').each((i, el) => {
        const text = $upsc(el).text().trim();
        const href = $upsc(el).attr('href');
        
        if (text && href && text.length > 10) {
          scrapedJobs.push({
            title: `UPSC: ${text.substring(0, 100)}`,
            organization: 'Union Public Service Commission (UPSC)',
            type: 'GOVERNMENT',
            category: 'NEW_UPDATE',
            location: 'All India',
            state: 'Central',
            qualification: 'Any Degree / Specific',
            applyUrl: href.startsWith('http') ? href : `https://upsc.gov.in${href}`,
          });
        }
      });
    } catch (e) {
      console.error("UPSC Scrape failed", e);
    }

    // 3. Scrape APPSC (Andhra Pradesh Public Service Commission)
    try {
      const appscResponse = await fetch('https://psc.ap.gov.in/', { next: { revalidate: 0 } });
      const appscHtml = await appscResponse.text();
      const $appsc = cheerio.load(appscHtml);
      
      // Look for marquee or news links (Generic approach for APPSC)
      $appsc('a').each((i, el) => {
        const text = $appsc(el).text().trim();
        const href = $appsc(el).attr('href');
        
        if (text && text.toLowerCase().includes('notification') && href) {
          scrapedJobs.push({
            title: `APPSC: ${text.substring(0, 100)}`,
            organization: 'Andhra Pradesh Public Service Commission (APPSC)',
            type: 'GOVERNMENT',
            category: 'NEW_UPDATE',
            location: 'Andhra Pradesh',
            state: 'Andhra Pradesh',
            qualification: 'Check Notification',
            applyUrl: href.startsWith('http') ? href : `https://psc.ap.gov.in${href.startsWith('/') ? href : '/' + href}`,
          });
        }
      });
    } catch (e) {
      console.error("APPSC Scrape failed", e);
    }

    // 4. Scrape TGPSC (Telangana State Public Service Commission)
    try {
      const tspscResponse = await fetch('https://tspsc.gov.in/', { next: { revalidate: 0 } });
      const tspscHtml = await tspscResponse.text();
      const $tspsc = cheerio.load(tspscHtml);
      
      $tspsc('a').each((i, el) => {
        const text = $tspsc(el).text().trim();
        const href = $tspsc(el).attr('href');
        
        if (text && text.toLowerCase().includes('notification') && href) {
          scrapedJobs.push({
            title: `TGPSC: ${text.substring(0, 100)}`,
            organization: 'Telangana State Public Service Commission (TGPSC)',
            type: 'GOVERNMENT',
            category: 'NEW_UPDATE',
            location: 'Telangana',
            state: 'Telangana',
            qualification: 'Check Notification',
            applyUrl: href.startsWith('http') ? href : `https://tspsc.gov.in${href.startsWith('/') ? href : '/' + href}`,
          });
        }
      });
    } catch (e) {
      console.error("TSPSC Scrape failed", e);
    }

    // Limit to 20 latest updates per run to avoid spamming the DB
    const jobsToInsert = scrapedJobs.slice(0, 20);
    let insertedCount = 0;

    // Insert into Neon Database (checking for duplicates via title)
    for (const job of jobsToInsert) {
      const exists = await prisma.job.findFirst({
        where: { title: job.title }
      });

      if (!exists) {
        await prisma.job.create({ data: job });
        insertedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Scraping complete. Found ${scrapedJobs.length} updates. Inserted ${insertedCount} new jobs.`,
      jobsAdded: insertedCount
    });

  } catch (error) {
    console.error('Master scraping error:', error);
    return NextResponse.json({ error: 'Failed to scrape websites' }, { status: 500 });
  }
}
