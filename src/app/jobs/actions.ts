"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function toggleSaveJob(jobId: string) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    throw new Error("Must be logged in to save jobs");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) throw new Error("User not found");

  const existing = await prisma.savedJob.findUnique({
    where: {
      userId_jobId: {
        userId: user.id,
        jobId: jobId,
      },
    },
  });

  if (existing) {
    // Unsave
    await prisma.savedJob.delete({
      where: {
        userId_jobId: {
          userId: user.id,
          jobId: jobId,
        },
      },
    });
  } else {
    // Save
    await prisma.savedJob.create({
      data: {
        userId: user.id,
        jobId: jobId,
      },
    });
  }

  revalidatePath("/jobs/[id]");
  revalidatePath("/profile");
}
