import { NextResponse } from "next/server";

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
