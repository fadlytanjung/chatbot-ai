"use client";

import ChatHeader from "@/components/chat-header";
import ChatMessage from "@/components/chat-message";

export interface Message {
  id: number | string;
  text: string;
  fromUser: boolean;
}

const data: Message[] = [
  { id: 1, text: "Good morning! How can I help you today?", fromUser: false },
  { id: 2, text: "I want to clone your chatbot UI.", fromUser: true },
  { id: 3, text: "Sure—here's a Tailwind slice for you.", fromUser: false },
];

export default function Chat() {
  return (
    <>
      {data.length && <ChatHeader />}
      <main className={`${data.length ? "flex-1 overflow-y-auto" : ""}`}>
        <div className="md:w-[768px] w-full mx-auto overflow-y-auto p-4">
          {!data.length ? (
            <p className="text-center font-medium text-2xl">
              What can I help with?
            </p>
          ) : (
            data.map((m) => <ChatMessage {...m} key={m.id} />)
          )}
        </div>
      </main>
    </>
  );
}
