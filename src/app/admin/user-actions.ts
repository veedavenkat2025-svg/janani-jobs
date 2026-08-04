"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Utility to verify admin status before executing queries
async function verifyAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return false;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return user?.role === "ADMIN";
}

export async function updateUserRole(userId: string, newRole: string) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized: Only admins can change user roles.");
  }

  // Prevent admin from demoting themselves to avoid locking out the system
  const session = await getServerSession(authOptions);
  const targetUser = await prisma.user.findUnique({ where: { id: userId } });
  
  if (targetUser?.email === session?.user?.email) {
    throw new Error("You cannot change your own role.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  revalidatePath("/admin");
}

export async function deleteUser(userId: string) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized: Only admins can delete users.");
  }

  const session = await getServerSession(authOptions);
  const targetUser = await prisma.user.findUnique({ where: { id: userId } });
  
  if (targetUser?.email === session?.user?.email) {
    throw new Error("You cannot delete yourself.");
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  revalidatePath("/admin");
}
