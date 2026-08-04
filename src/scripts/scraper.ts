import { runScraper } from "../lib/scraper";
import { prisma } from "../lib/prisma";

async function main() {
  console.log("[Script] Initializing Live Scraper Engine...");
  try {
    const result = await runScraper();
    console.log("[Script] Result:", result);
  } catch (error) {
    console.error("[Script] Critical failure:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
