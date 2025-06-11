"use client";

import ChatInput from "@/components/chat-input";
import ChatHeader from "@/components/chat-header";
import ChatMessage from "@/components/chat-message";
import { useCallback, useEffect, useRef, useState } from "react";
import { env } from "@/libs/env";

export interface Message {
  id: number | string;
  text: string;
  fromUser: boolean;
}

function toApiMessages(history: Message[]) {
  return history.map((m) => ({
    role: m.fromUser ? "user" : "assistant",
    content: m.text,
  }));
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = useCallback(async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, fromUser: true, text },
    ]);

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, fromUser: false, text: "" },
    ]);
    setLoading(true);

    const fullHistory = toApiMessages(messages.concat({ id: messages.length + 1, fromUser: true, text }));
    const controller = new AbortController();

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ messages: fullHistory }),
      signal: controller.signal,
    });

    if (!res.ok || !res.body) {
      console.error("Failed to fetch stream", res.status);
      setLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1].text = buffer;
        return copy;
      });
    }

    setLoading(false);
  }, [messages]);

  return (
    <>
      {messages.length > 0 && <ChatHeader />}
      <main className={`${messages.length ? "flex-1 overflow-y-auto" : ""}`}>
        <div className="md:w-[768px] w-full mx-auto overflow-y-auto p-4">
          {messages.length === 0 ? (
            <p className="text-center font-medium text-2xl">
              What can I help with?
            </p>
          ) : (
            messages.map((m) => <ChatMessage {...m} key={m.id} />)
          )}
        </div>
        <div ref={bottomRef} />
      </main>
      <ChatInput onSubmit={onSubmit} isLoading={loading} />
    </>
  );
}
