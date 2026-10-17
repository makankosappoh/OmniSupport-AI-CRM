import OpenAI from "openai";

import https from "https";

const agent = new https.Agent({

rejectUnauthorized: false, // For development - set to true in production

});

const customFetch = (url: RequestInfo | URL, init?: RequestInit) => {

return fetch(url, {

...init,

// @ts-ignore - Node.js specific

agent: url.toString().startsWith("https") ? agent : undefined,

});

};

export const openai = new OpenAI({

apiKey: process.env.GROQ_API_KEY,

fetch: customFetch,

baseURL: process.env.GROQ_BASE_URL,

});

function cleanMarkdown(md: string) {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/\\\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function summarizeMarkdown(markdown: string) {

  const cleaned = cleanMarkdown(markdown).slice(0, 12000);

  try {

    const completion = await openai.chat.completions.create({

      model: "openai/gpt-oss-20b",

      temperature: 0.1,

      max_tokens: 2500,

      // @ts-ignore - Groq reasoning models accept this
      reasoning_effort: "low",

      messages: [

        {

          role: "system",

          content: `

You are a data summarization engine for an AI chatbot.

Your task:

- Convert the input website markdown or text or csv files data into a CLEAN, DENSE SUMMARY for LLM context usage.

STRICT RULES:

- Output ONLY plain text (no markdown, no bullet points, no headings).
- Write as ONE continuous paragraph.
- Remove navigation, menus, buttons, CTAs, pricing tables, sponsors, ads, testimonials, community chats, UI labels, emojis, and decorative content.
- Remove repetition and marketing language.
- Keep ONLY factual, informational content that helps answer customer support questions.
- Do NOT copy sentences verbatim unless absolutely necessary.
- Compress aggressively while preserving meaning.
- The final output MUST be under 2000 words.

The result will be stored as long-term context for a chatbot.

`,

        },

        {

          role: "user",

          content: cleaned,

        },

      ],

    });

    const summary = completion.choices[0].message.content?.trim() ?? "";

    console.log(
      "summary length:",
      summary.length,
      "| finish:",
      completion.choices[0].finish_reason
    );

    // never return an empty preview
    return summary || cleaned.slice(0, 3000);

  } catch (error) {

    console.error("Error in summarizeMarkdown:", error);

    // keep the scrape instead of losing it when Groq fails
    return cleaned.slice(0, 3000);

  }

}

export async function summarizeConversation(messages: any[]) {

  try {

    const completion = await openai.chat.completions.create({

      model: "openai/gpt-oss-20b",

      temperature: 0.3,

      max_tokens: 1500,

      // @ts-ignore - Groq reasoning models accept this
      reasoning_effort: "low",

      messages: [

        {

          role: "system",

          content:

            "Summarize the following conversation history into a concise paragraph, preserving key details and user intent.The final output MUST be under 2000 words.",

        },

        ...messages,

      ],

    });

    return completion.choices[0].message.content?.trim() ?? "";

  } catch (error) {

    console.error("Error in summarizeConversation:", error);

    throw error;

  }

}