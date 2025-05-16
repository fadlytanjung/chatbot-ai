import Image from "next/image";

export default function ChatHeader() {
  return (
    <header className="flex items-center gap-4 p-4
      bg-white border-b border-gray-200
        md:w-[768px] w-full mx-auto">
      <Image
        src="/logo.png"
        alt="logo"
        width={36}
        height={36}
        className="h-9 w-9"
      />
      <h1 className="text-lg font-medium">ChatGPT Clone</h1>
    </header>
  );
}
