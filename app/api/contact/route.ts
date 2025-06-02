import { type NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import nodemailer from "nodemailer"

// MongoDB Connection
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      bufferCommands: false,
    })
    console.log("✅ Connected to MongoDB Atlas")
  } catch (error) {
    console.error("❌ MongoDB connection error:", error)
    throw error
  }
}

// Contact Message Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["new", "read", "replied"],
    default: "new",
  },
})

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema)

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { name, email, subject, message } = await request.json()

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address",
        },
        { status: 400 },
      )
    }

    // Save to database
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    })

    await newContact.save()
    console.log("✅ Contact saved to database:", newContact._id)

    // Send email notification to you
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: `🚨 New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px;">
          <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #8b5cf6; margin-top: 0; text-align: center;">🚀 New Contact Form Submission</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8b5cf6;">
              <p style="margin: 0 0 10px 0;"><strong style="color: #4c1d95;">👤 Name:</strong> ${name}</p>
              <p style="margin: 0 0 10px 0;"><strong style="color: #4c1d95;">📧 Email:</strong> <a href="mailto:${email}" style="color: #8b5cf6;">${email}</a></p>
              <p style="margin: 0 0 10px 0;"><strong style="color: #4c1d95;">📋 Subject:</strong> ${subject}</p>
              <p style="margin: 0 0 10px 0;"><strong style="color: #4c1d95;">💬 Message:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px; border: 1px solid #e2e8f0;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}?subject=Re: ${subject}" style="background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reply to ${name}</a>
            </div>
            <p style="color: #64748b; font-size: 14px; text-align: center; margin-top: 20px;">
              📅 Received on: ${new Date().toLocaleString()}
            </p>
            <div style="background: #fee2e2; border: 1px solid #fecaca; padding: 15px; border-radius: 6px; margin-top: 20px;">
              <p style="margin: 0; color: #dc2626; font-weight: bold;">⚡ Quick Actions:</p>
              <p style="margin: 5px 0 0 0; color: #7f1d1d;">Reply immediately to maintain engagement!</p>
            </div>
          </div>
        </div>
      `,
    }

    // Send auto-reply to user
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting me! 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px;">
          <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #8b5cf6; margin-top: 0; text-align: center;">🎉 Thank You for Your Message!</h2>
            <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${name}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6;">Thank you for reaching out to me! I have received your message and will get back to you as soon as possible, usually within 24 hours.</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8b5cf6;">
              <h3 style="margin-top: 0; color: #4c1d95;">📋 Your Message Summary:</h3>
              <p style="margin: 0 0 10px 0;"><strong>Subject:</strong> ${subject}</p>
              <p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px; border: 1px solid #e2e8f0;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            
            <div style="background: linear-gradient(135deg, #8b5cf6, #ec4899); padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <p style="color: white; margin: 0; font-weight: bold;">🚀 Let's build something amazing together!</p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6;">Best regards,<br><strong>Amit Kumar</strong><br>Software Engineer</p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://github.com/AmitKumar9430" style="color: #8b5cf6; text-decoration: none; margin: 0 10px;">GitHub</a>
              <a href="https://www.linkedin.com/in/amit-kumar-9t5m2i3a" style="color: #8b5cf6; text-decoration: none; margin: 0 10px;">LinkedIn</a>
              <a href="https://www.instagram.com/_amit_singh_30" style="color: #8b5cf6; text-decoration: none; margin: 0 10px;">Instagram</a>
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px; color: #64748b; font-size: 14px; text-align: center;">
              <p>This is an automated response. Please do not reply to this email.</p>
              <p>💜 Thank you for your interest in working with me!</p>
            </div>
          </div>
        </div>
      `,
    }

    // Send emails with better error handling
    try {
      console.log("📧 Sending notification email...")
      await transporter.sendMail(mailOptions)
      console.log("✅ Notification email sent successfully")

      console.log("📧 Sending auto-reply email...")
      await transporter.sendMail(autoReplyOptions)
      console.log("✅ Auto-reply email sent successfully")
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError)
      // Still return success since data was saved to database
      return NextResponse.json(
        {
          success: true,
          message: "Message received! There was an issue sending email notifications, but I got your message.",
          data: {
            id: newContact._id,
            timestamp: newContact.createdAt,
          },
        },
        { status: 201 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! I will get back to you soon.",
        data: {
          id: newContact._id,
          timestamp: newContact.createdAt,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("❌ Contact form error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}

// GET endpoint for admin to view contacts
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    const query = status ? { status } : {}
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)

    const total = await Contact.countDocuments(query)

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    })
  } catch (error) {
    console.error("Get contacts error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contacts",
      },
      { status: 500 },
    )
  }
}
