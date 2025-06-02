"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Clock, User, MessageSquare } from "lucide-react"

interface Contact {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  status: "new" | "read" | "replied"
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contact")
      const data = await response.json()

      if (data.success) {
        setContacts(data.data)
      } else {
        setError(data.message || "Failed to fetch contacts")
      }
    } catch (err) {
      setError("Failed to fetch contacts")
      console.error("Error fetching contacts:", err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-500"
      case "read":
        return "bg-yellow-500"
      case "replied":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading contacts...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Contact Messages</h1>
          <p className="text-gray-300">Manage and view all contact form submissions</p>
        </div>

        <div className="grid gap-6">
          {contacts.length === 0 ? (
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
                <p className="text-gray-400">Contact form submissions will appear here</p>
              </CardContent>
            </Card>
          ) : (
            contacts.map((contact) => (
              <Card
                key={contact._id}
                className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-xl">{contact.subject}</CardTitle>
                    <Badge className={`${getStatusColor(contact.status)} text-white`}>{contact.status}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{contact.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${contact.email}`} className="text-purple-400 hover:text-purple-300">
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-black/20 p-4 rounded-lg border border-purple-500/20">
                    <p className="text-gray-300 whitespace-pre-wrap">{contact.message}</p>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
                      asChild
                    >
                      <a href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Reply
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={fetchContacts}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            Refresh Contacts
          </Button>
        </div>
      </div>
    </div>
  )
}
