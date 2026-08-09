import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { jobPreference, statePreference, qualificationPref } = body;

    const dataToUpdate: any = {};
    if (jobPreference !== undefined) dataToUpdate.jobPreference = jobPreference;
    if (statePreference !== undefined) dataToUpdate.statePreference = statePreference;
    if (qualificationPref !== undefined) dataToUpdate.qualificationPref = qualificationPref;

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Failed to update user preference:", error);
    return NextResponse.json(
      { error: "Failed to update preference" },
      { status: 500 }
    );
  }
}
