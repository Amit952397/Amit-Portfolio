import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export function ContactFormFallback() {
  return (
    <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-white">Contact Me</CardTitle>
      </CardHeader>
      <CardContent className="text-center py-8">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-purple-500/20 rounded-full">
            <Mail className="h-8 w-8 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Direct Email</h3>
          <p className="text-gray-300 mb-4">
            The contact form is currently unavailable. Please reach out to me directly via email:
          </p>
          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            asChild
          >
            <a href="mailto:23bcs12621@cuchd.in">
              <Mail className="mr-2 h-4 w-4" />
              Email Me
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
