import { NextResponse } from "next/server"
import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"

export async function POST(req: Request) {
  try {
    if (!process.env.XAI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "AI chat is not configured. Please set XAI_API_KEY in your environment variables to enable the chat.",
        },
        { status: 503 },
      )
    }

    const body = await req.json().catch(() => null)
    const messages: Array<{ role: "user" | "assistant"; content: string }> = body?.messages ?? []

    const transcript = messages
      .slice(-12)
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n")

    const systemPrompt = `
You are "Amit's AI Assistant", a helpful portfolio assistant for Amit Kumar.
Keep responses concise, friendly, and helpful. Offer to connect via the Contact section if requests need follow-up.
Amit is a Full-Stack engineer with strong ML/DL skills, Big Data experience, and a focus on real-world apps.
`

    const { text } = await generateText({
      model: xai("grok-3"),
      system: systemPrompt,
      prompt: transcript ? transcript + "\nAssistant:" : "User: Hello!\nAssistant:",
    })

    return NextResponse.json({ success: true, reply: text })
  } catch (err: any) {
    console.error("Chat route error:", err)
    return NextResponse.json(
      { success: false, error: "Unexpected server error", details: err?.message ?? "Unknown error" },
      { status: 500 },
    )
  }
}
