import { runScraper } from "./src/lib/scraper";

async function testScraper() {
  console.log("Triggering Scraper...");
  const result = await runScraper();
  console.log("Scraper Result:", result);
}

testScraper().catch(console.error);
