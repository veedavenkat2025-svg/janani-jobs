const { chromium, devices } = require('playwright');

(async () => {
  console.log('Starting browser...');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['iPhone 12'],
  });
  const page = await context.newPage();
  
  console.log('Navigating to Home...');
  await page.goto('https://janani-jobs-beta.vercel.app/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot1.png' });

  console.log('Navigating to Jobs...');
  await page.goto('https://janani-jobs-beta.vercel.app/jobs', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot2.png' });

  console.log('Navigating to Mock Tests...');
  await page.goto('https://janani-jobs-beta.vercel.app/exam-prep', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot3.png' });

  await browser.close();
  console.log('Screenshots saved!');
})();
