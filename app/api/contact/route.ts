import { NextResponse } from "next/server"
import { getSupabaseServer, checkSupabaseConnection } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    // Check if environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing Supabase environment variables")
      return NextResponse.json(
        {
          success: false,
          error: "Server configuration error. Please contact the administrator.",
        },
        { status: 500 },
      )
    }

    // Get Supabase client
    const supabaseServer = getSupabaseServer()

    // Check Supabase connection
    const connectionCheck = await checkSupabaseConnection()
    if (!connectionCheck.success) {
      console.error("Supabase connection error:", connectionCheck.error)
      return NextResponse.json(
        {
          success: false,
          error: "Database connection error. Please try again later.",
          details: connectionCheck.error,
        },
        { status: 500 },
      )
    }

    // Parse the request body
    const formData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Add timestamp to the form data
    const contactData = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject || "Contact Form Submission",
      message: formData.message,
      status: "new",
      created_at: new Date().toISOString(),
    }

    console.log("Attempting to insert data into Supabase:", contactData)

    // Insert the data into the 'contacts' table
    const { data, error } = await supabaseServer.from("contacts").insert(contactData).select()

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save your message. Please try again later.",
          details: error.message,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been received.",
    })
  } catch (error: any) {
    console.error("Server error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Server error processing your request. Please try again later.",
        details: error?.message || "Unknown error",
      },
      { status: 500 },
    )
  }
}
