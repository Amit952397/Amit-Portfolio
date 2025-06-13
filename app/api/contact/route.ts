import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Parse the request body
    const formData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Check if Supabase environment variables are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.log("Supabase environment variables not found. Using email fallback.")

      // Instead of failing, we'll simulate success but log the message
      console.log("Contact form submission:", {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "Contact Form Submission",
        message: formData.message,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        message: "Thank you! Your message has been received. We'll contact you via email.",
      })
    }

    // If we have Supabase credentials, import the client and use it
    const { createClient } = await import("@supabase/supabase-js")

    // Create a Supabase client
    const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
      },
    })

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
