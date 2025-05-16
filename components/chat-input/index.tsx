"use client";

import {
  PaperAirplaneIcon,
  PlusIcon,
  GlobeAltIcon,
  SparklesIcon,
  PhotoIcon,
  EllipsisHorizontalIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";

export function ChatInput() {
  return (
    <div className="bg-white px-4 pt-4 border-gray-200 md:w-[768px] w-full mx-auto">
      <div
        className="flex flex-col items-start gap-2 rounded-[24px] border border-gray-300 bg-white
        px-4 py-4 shadow-sm h-auto max-h-[200px] overflow-clip
        w-full cursor-text justify-center bg-clip-padding contain-inline-size
        sm:shadow-lg"
      >
        <div className="overflow-auto [scrollbar-width:thin] w-full default-browser vertical-scroll-fade-mask min-h-12">
          <textarea
            placeholder="Ask anything"
            className="
              resize-none
              text-sm
            placeholder-gray-400
              focus:outline-none
              w-full"
          />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100 border-gray-100 border">
              <PlusIcon className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 border-gray-100 border">
              <GlobeAltIcon className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 border-gray-100 border">
              <SparklesIcon className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 border-gray-100 border">
              <PhotoIcon className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 border-gray-100 border">
              <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <div className="flex flex-row-reverse gap-4">
            <button className="p-2 rounded-full bg-black hover:bg-black/70 text-white border border-gray-100">
              <PaperAirplaneIcon className="h-5 w-5 rotate-0" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 border border-gray-100">
              <MicrophoneIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      <p className="text-[12px] text-center text-gray-500 py-2">
        ChatGPT can make mistakes. Check important info.{" "}
        <a href="https://chatgpt.com" className="underline">
          See Cookie Preferences.
        </a>
      </p>
    </div>
  );
}
