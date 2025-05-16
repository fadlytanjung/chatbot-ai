export const metadata = { title: "Open AI Clone" };

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center h-screen">
      {children}
    </div>
  );
}
