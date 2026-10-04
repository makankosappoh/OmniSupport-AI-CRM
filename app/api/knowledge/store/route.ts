// store route.ts
import { NextRequest, NextResponse } from 'next/server'
import { isAuthorized } from '@/lib/isAuthorized'
import { summarizeMarkdown } from '@/lib/openAI';
import { db } from '@/db/client';
import { knowledge_source } from '@/db/schema';

export async function POST(req:NextRequest) {
    try {
        const user = await isAuthorized();
        if(!user) {
        return new Response("Unauthorized", {status: 401});
        }
        const contentType = req.headers.get("content-type") || "";
        let type: string;
        let body: any = {};

        if(contentType.includes("multipart/form-data")){
            const formData = await req.formData();
            type = formData.get("type") as string;

            if(type === "upload"){
                const file = formData.get("file") as File;
                if(!file) {
                    return new Response("No file uploaded", {status: 400});
                }

                const fileContent = await file.text();
                const lines = fileContent.split("\n").filter((line) => line.trim());
                const headers = lines[0]?.split(",").map((h) => h.trim());
                let formattedContent:any = "";
                const markdown = await summarizeMarkdown(fileContent);
                formattedContent = markdown;

                await db.insert(knowledge_source).values({
                    user_email: user.email,
                    name: file.name,
                    type: "upload",
                    status: "active",
                    source_url: file.name,
                    content: formattedContent,
                    metadata: JSON.stringify({
                        fileName: file.name,
                        fileSize: file.size,
                        rowCount: lines.length - 1,
                        headers: headers,
                    }),
                });

                return NextResponse.json(
                    { message: "CSV file uploaded successfully" },
                    {
                        status: 200,
                    }
                );
            } 
        } else {
                body = await req.json();
                type = body.type;
            }

            if(type === "website"){
                const zenUrl = new URL("https://api.zenrows.com/v1");
                zenUrl.searchParams.set("apikey", process.env.ZENROWS_API_KEY!);
                zenUrl.searchParams.set("url", body.url);
                zenUrl.searchParams.set("response_type", "markdown");

                const res = await fetch(zenUrl.toString(), {
                    headers: {
                        "User-Agent": "OmniSupportAIBot/1.0",
                    },
                });

                const html = await res.text();
                if(!res.text){
                    return NextResponse.json(
                        {
                            error: "ZenRows request failed",
                            status: 500,
                            body: html.slice(0, 502),
                        },
                        {
                            status: 500,
                        }
                    );
                }

                console.log(html ,"markdown");

                const markdown = await summarizeMarkdown(html);

                await db.insert(knowledge_source).values({
                    user_email: user.email,
                    name: body.url,
                    type: "website",
                    status: "active",
                    source_url: body.url,
                    content: markdown,
                });
            } else if(type === "text") {
                let content = body.content;
                if(body.content.length > 500){
                    const markdown = await summarizeMarkdown(body.content);
                    content = markdown;
                }

                await db.insert(knowledge_source).values({
                    user_email: user.email,
                    name: body.title,
                    type: "text",
                    status: "active",
                    source_url: body.title,
                    content: content,
                });
            }

        return NextResponse.json(
            { message: "Source added successfully" },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error adding source", error);
        return NextResponse.json(
            { message: "Internal server error" },
            {
                status: 500,
            }
        );
    }

}