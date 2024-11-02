import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

// Initialize the AI model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
}

export async function GET() {
  return NextResponse.json({
    message: "Hello world",
  })
}

export async function POST(req: Request) {
  const { message, history } = await req.json()

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 })
  }

  try {
    const formattedHistory = history.map(
      (entry: { role: string; content: string }) => ({
        role: entry.role,
        parts: [{ text: entry.content }],
      })
    )

    const chatSession = model.startChat({
      generationConfig,
      history: formattedHistory,
    })

    let fullResponse = ""
    const result = await chatSession.sendMessageStream(message)

    if (!result?.stream) {
      throw new Error("Failed to get response stream from chat session.")
    }

    for await (const chunk of result.stream) {
      fullResponse += chunk.text()
    }

    return NextResponse.json({ response: fullResponse })
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error generating AI reply",
      },
      { status: 500 }
    )
  }
}
