import ChatComponent from "@/components/ChatComponent"

export default function Home() {
  return (
    <div className="w-full items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-4xl">
        <ChatComponent />
      </main>
    </div>
  )
}
