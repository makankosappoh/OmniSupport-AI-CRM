import { isAuthorized } from "@/lib/isAuthorized";
import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { chatBotMetadata } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
try {
    const user = await isAuthorized();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const [existingMetadata] = await db.select().from(chatBotMetadata).where(eq(chatBotMetadata.user_email, user.email));

    if(!existingMetadata){
        const [newMetadata] = await db.insert(chatBotMetadata).values({
            user_email: user.email!,
        }).returning();

        return NextResponse.json(newMetadata, { status: 200 });
    }
    return NextResponse.json(existingMetadata, { status: 200 });

} catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
}