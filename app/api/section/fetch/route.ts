import { isAuthorized } from "@/lib/isAuthorized";
import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { sections } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
try {
    const user = await isAuthorized();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await db
    .select()
    .from(sections)
    .where(eq(sections.user_email, user.email));

    return NextResponse.json(response);

} catch (error) {
    console.error("Failed to fetch sections:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
}