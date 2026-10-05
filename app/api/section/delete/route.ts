import { isAuthorized } from "@/lib/isAuthorized";
import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { sections } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request) {
try {
    const user = await isAuthorized();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ error: "Missing Section id (required)" }, { status: 400 });
    }
    const response = await db
        .select()
        .from(sections)
        .where(eq(sections.user_email, user.email));

    if(!sections){
        return NextResponse.json({ error: "you can't delete this section" }, { status: 400 });
    }

    const result = await db.delete(sections).where(eq(sections.id, id));

    return NextResponse.json(response);

} catch (error) {
    console.error("Failed to delete section:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
}