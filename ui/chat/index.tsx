"use client";

import ChatInput from "@/components/chat-input";
import ChatHeader from "@/components/chat-header";
import ChatMessage from "@/components/chat-message";
import { useCallback, useState } from "react";
import { env } from "@/libs/env";

export interface Message {
  id: number | string;
  text: string;
  fromUser: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

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

    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/genai`);
    if (!res.ok || !res.body) {
      console.error("Failed to fetch stream");
      setLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          last.text = buffer;
          return copy;
        });
      }
    }

    setLoading(false);
  }, []);

  return (
    <>
      {messages.length && <ChatHeader />}
      <main className={`${messages.length ? "flex-1 overflow-y-auto" : ""}`}>
        <div className="md:w-[768px] w-full mx-auto overflow-y-auto p-4">
          {!messages.length ? (
            <p className="text-center font-medium text-2xl">
              What can I help with?
            </p>
          ) : (
            messages.map((m) => <ChatMessage {...m} key={m.id} />)
          )}
        </div>
      </main>
      <ChatInput onSubmit={onSubmit} isLoading={loading} />
    </>
  );
}
