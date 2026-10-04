// store route.ts
import { NextRequest } from 'next/server'
import { isAuthorized } from '@/lib/isAuthorized'
import { summarizeMarkdown } from '@/lib/openAI';
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
            } else {
                body = await req.json();
                type = body.type;
            }

            if(type === "website"){
                
            }
        }
    } catch (error) {
    
    }

}