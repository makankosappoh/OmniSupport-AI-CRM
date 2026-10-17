import { NextResponse } from "next/server";
import { db } from "@/db/client"; 
import { eq } from "drizzle-orm";
import { knowledge_source } from "@/db/schema";
import { isAuthorized } from "@/lib/isAuthorized";

export async function DELETE(request: Request) {
    try {
        const user = await isAuthorized();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Source ID is required" }, { status: 400 });
        }

        // Delete from Neon
        await db
            .delete(knowledge_source)
            .where(eq(knowledge_source.id, id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}