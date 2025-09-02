"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Send, X, Bot, UserIcon, Loader2 } from "lucide-react"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! I’m Amit’s AI assistant. Ask me about projects, ML/DL skills, experience, or how to get in touch.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [open, messages, isLoading])

  const sendMessage = async () => {
    const content = input.trim()
    if (!content || isLoading) return
    setError(null)
    setIsLoading(true)
    setInput("")
    const nextMessages = [...messages, { role: "user", content } as ChatMessage]
    setMessages(nextMessages)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      })

      const json = await res.json().catch(() => ({
        success: false,
        error: "Invalid response from server",
      }))

      if (!res.ok || !json?.success) {
        const errMsg =
          json?.error ?? "Chat is unavailable right now. Please try again later or reach out via the Contact section."
        setError(errMsg)
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "AI chat isn’t configured on this deployment yet. Please use the Contact section to reach me.",
          },
        ])
        return
      }

      setMessages((prev) => [...prev, { role: "assistant", content: json.reply }])
    } catch (e: any) {
      setError(e?.message ?? "Network error")
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I hit a network error. Please try again soon or use the Contact section to reach me.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      void sendMessage()
    }
  }

  return (
    <>
      {/* Floating toggle button */}
      <div className="fixed bottom-4 right-4 z-[100]">
        {!open && (
          <Button
            onClick={() => setOpen(true)}
            className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Chat with me
          </Button>
        )}
      </div>

      {/* Chat panel */}
      {open && (
        <Card className="fixed bottom-4 right-4 z-[110] w-[min(92vw,380px)] shadow-2xl border-purple-500/30 bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between py-3">
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Bot className="h-5 w-5 text-purple-400" />
              Amit’s AI Assistant
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="h-5 w-5 text-gray-300" />
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div
              ref={scrollRef}
              className="h-[380px] overflow-y-auto pr-2 space-y-3 scrollbar-hide"
              aria-live="polite"
              aria-atomic="false"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <div className="mt-1 p-2 rounded-full bg-purple-500/20 border border-purple-500/30">
                      <Bot className="h-4 w-4 text-purple-300" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-black/30 text-gray-100 border border-purple-500/20"
                    }`}
                  >
                    {m.content}
                  </div>
                  {m.role === "user" && (
                    <div className="mt-1 p-2 rounded-full bg-purple-500/20 border border-purple-500/30">
                      <UserIcon className="h-4 w-4 text-purple-300" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking…
                </div>
              )}
            </div>

            {error && (
              <div className="mt-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded p-2">
                {error}
              </div>
            )}

            <div className="mt-3 flex items-end gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask about projects, skills, ML/DL, or contact…"
                className="min-h-[44px] max-h-[120px] bg-black/30 border-purple-500/30 text-white placeholder:text-gray-400"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <p className="mt-2 text-[11px] text-gray-400">Press Enter to send, Shift+Enter for a new line.</p>
          </CardContent>
        </Card>
      )}
    </>
  )
}
