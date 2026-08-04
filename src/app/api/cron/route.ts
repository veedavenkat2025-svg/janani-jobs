import { NextResponse } from 'next/server';
import { runScraper } from '@/lib/scraper';
import { prisma } from '@/lib/prisma';

// This API route is intended to be hit by a cron job scheduler (like Vercel Cron)
export async function GET(request: Request) {
  // Simple security check to prevent unauthorized triggering
  const authHeader = request.headers.get('authorization');
  
  // In production, CRON_SECRET would be set in Vercel to match the header
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const result = await runScraper();
  
  if (result.success) {
    const scrapedJobs = result.data || [];
    
    // 2. Insert into database
    let newJobsCount = 0;
    const allUsers = await prisma.user.findMany({ select: { id: true, email: true } });

    for (const job of scrapedJobs) {
      // Check if job already exists (by title and org)
      const existing = await prisma.job.findFirst({
        where: {
          title: job.title,
          organization: job.organization,
        }
      });

      if (!existing) {
        const newJob = await prisma.job.create({
          data: job
        });
        newJobsCount++;

        // --- EMAIL & NOTIFICATION ENGINE ---
        // For every new job, notify all registered users
        for (const user of allUsers) {
          // 1. Create In-App Notification
          await prisma.notification.create({
            data: {
              userId: user.id,
              title: "🔥 New Govt Job Alert!",
              message: `${job.title} at ${job.organization} was just posted. Apply before it closes!`,
              link: `/jobs/${newJob.id}`,
            }
          });

          // 2. Trigger Email Alert (Simulated logic using Nodemailer/Resend)
          /* 
          TODO: Add Resend API key to .env (RESEND_API_KEY) and uncomment:
          await resend.emails.send({
            from: 'alerts@jananijobs.com',
            to: user.email,
            subject: `New Job: ${job.title}`,
            html: `<p>A new job at ${job.organization} was posted!</p><a href="https://janani-jobs.vercel.app/jobs/${newJob.id}">Apply Now</a>`
          });
          */
          console.log(`[EMAIL MOCK] Sent alert to ${user.email} for job ${newJob.id}`);
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Scraping completed. Added ${newJobsCount} new jobs and sent notifications.` 
    });
  } else {
    return NextResponse.json(result, { status: 500 });
  }
}
