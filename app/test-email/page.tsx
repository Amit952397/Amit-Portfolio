"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function TestEmail() {
  const [formData, setFormData] = useState({
    name: "Test User",
    email: "test@example.com",
    subject: "Test Email System",
    message: "This is a test message to verify the email system is working correctly.",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [responseMessage, setResponseMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setResponseMessage(data.message)
      } else {
        setStatus("error")
        setResponseMessage(data.message || "Failed to send email")
      }
    } catch (error) {
      setStatus("error")
      setResponseMessage("Network error occurred")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Test Email System</h1>
          <p className="text-gray-300">Test the contact form email delivery system</p>
        </div>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Send Test Email</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black/20 border-purple-500/30 text-white"
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-black/20 border-purple-500/30 text-white"
                  required
                />
              </div>
              <Input
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="bg-black/20 border-purple-500/30 text-white"
                required
              />
              <Textarea
                placeholder="Message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-black/20 border-purple-500/30 text-white"
                required
              />
              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Test Email...
                  </>
                ) : (
                  "Send Test Email"
                )}
              </Button>
            </form>

            {status === "success" && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-300">{responseMessage}</span>
              </div>
            )}

            {status === "error" && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
                <XCircle className="h-5 w-5 text-red-400" />
                <span className="text-red-300">{responseMessage}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 space-y-4">
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">How to Test:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Fill out the form above with your email address</li>
                <li>Click "Send Test Email"</li>
                <li>Check your email inbox (and spam folder)</li>
                <li>You should receive an auto-reply confirmation</li>
                <li>Check your notification email for the contact submission</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Environment Variables Check:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">MONGODB_URI:</span>
                  <span className={process.env.MONGODB_URI ? "text-green-400" : "text-red-400"}>
                    {process.env.MONGODB_URI ? "✓ Set" : "✗ Missing"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">EMAIL_USER:</span>
                  <span className={process.env.EMAIL_USER ? "text-green-400" : "text-red-400"}>
                    {process.env.EMAIL_USER ? "✓ Set" : "✗ Missing"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">EMAIL_PASS:</span>
                  <span className={process.env.EMAIL_PASS ? "text-green-400" : "text-red-400"}>
                    {process.env.EMAIL_PASS ? "✓ Set" : "✗ Missing"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">NOTIFICATION_EMAIL:</span>
                  <span className={process.env.NOTIFICATION_EMAIL ? "text-green-400" : "text-red-400"}>
                    {process.env.NOTIFICATION_EMAIL ? "✓ Set" : "✗ Missing"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
