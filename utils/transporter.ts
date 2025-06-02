import nodemailer from "nodemailer"

// Email transporter setup (using Gmail)
export const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter configuration error:", error)
  } else {
    console.log("✅ Email transporter is ready to send messages")
  }
})
