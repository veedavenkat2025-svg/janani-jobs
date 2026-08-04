import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

async function test1() {
  try {
    const prisma = new PrismaClient({ datasourceUrl: 'file:./dev.db' })
    const jobs = await prisma.job.findMany()
    console.log("Test 1 (datasourceUrl only) Success:", jobs)
  } catch(e) {
    console.error("Test 1 Failed:", e.message)
  }
}

async function test2() {
  try {
    process.env.DATABASE_URL = "file:./dev.db";
    const libsql = createClient({ url: 'file:./dev.db' })
    const adapter = new PrismaLibSql(libsql)
    const prisma = new PrismaClient({ adapter })
    const jobs = await prisma.job.findMany()
    console.log("Test 2 (adapter only) Success:", jobs)
  } catch(e) {
    console.error("Test 2 Failed:", e.message)
  }
}

async function test3() {
  try {
    const libsql = createClient({ url: 'file:./dev.db' })
    const adapter = new PrismaLibSql(libsql)
    const prisma = new PrismaClient({ adapter, datasourceUrl: 'file:./dev.db' })
    const jobs = await prisma.job.findMany()
    console.log("Test 3 (adapter + datasourceUrl) Success:", jobs)
  } catch(e) {
    console.error("Test 3 Failed:", e.message)
  }
}

async function main() {
  await test1()
  await test2()
  await test3()
}

main()
