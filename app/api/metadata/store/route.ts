import { NextRequest, NextResponse } from "next/server";
import { isAuthorized } from "@/lib/isAuthorized";
import { metadata } from "@/db/schema";
import { db } from "@/db/client";
import { cookies } from "next/headers";

export async function POST(req:NextRequest) {
        const user = await isAuthorized();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { business_name, website_url, external_links } = await req.json();

        if (!business_name || !website_url) {
            return NextResponse.json({ error: "Missing Business Name or Website URL" }, { status: 400 });
        }

        const metadataResponse = await db.insert(metadata).values({
            user_email: user.email,
            business_name,
            website_url,
            external_links,
        });

        (await cookies()).set("metadata", JSON.stringify({ business_name }));

        return NextResponse.json({ metadataResponse }, { status: 201 });
}