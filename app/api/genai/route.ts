import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { env } from "@/libs/env";

const FAKE_SENTENCES = [
  "Hello there!",
  "I'm your friendly bot.",
  "How can I help you today?",
  "Here's some information...",
  "And that's pretty much it.",
  "Let me know if you need anything else.",
];

export async function GET() {
  return new NextResponse(
    new ReadableStream({
      async start(controller) {
        for (const sentence of FAKE_SENTENCES) {
          await new Promise((r) => setTimeout(r, 200 + Math.random() * 600));
          controller.enqueue(new TextEncoder().encode(sentence + " "));
        }
        controller.close();
      },
    }),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
}

const ai = new GoogleGenAI({ apiKey: env.NEXT_PUBLIC_GEMINI_API_KEY! });

export async function POST(request: Request) {
  const { question } = await request.json();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const responseStream = await ai.models.generateContentStream({
          model: "gemini-2.0-flash-lite",
          contents: question,
        });

        for await (const chunk of responseStream) {
          if (chunk.text) {
            controller.enqueue(new TextEncoder().encode(chunk.text));
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
