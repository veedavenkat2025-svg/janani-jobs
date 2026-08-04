"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function deleteJob(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return { error: "Unauthorized" };

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (dbUser?.role !== "ADMIN") return { error: "Forbidden" };

  await prisma.job.delete({
    where: { id }
  });

  revalidatePath("/");
  revalidatePath("/admin");
  
  return { success: true };
}
