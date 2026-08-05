import { prisma } from "./src/lib/prisma";

async function cleanDB() {
  console.log("Deleting non-India private jobs...");
  const result = await prisma.job.deleteMany({
    where: { type: "PRIVATE" }
  });
  console.log(`Deleted ${result.count} private jobs.`);
}

cleanDB().catch(console.error).finally(() => prisma.$disconnect());
