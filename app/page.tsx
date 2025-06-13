"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import type { FunctionComponent } from "react"

import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  Home,
  User,
  Code,
  Briefcase,
  MessageSquare,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Download,
  Award,
  Globe,
  FileText,
  GamepadIcon,
  ShoppingCart,
  Sparkles,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, Phone, MapPin, Calendar, Send } from "lucide-react"
import { ContactFormFallback } from "@/components/contact-form-fallback"

const navigation = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Experience", href: "#experience", icon: Award },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Live Pages", href: "#live-pages", icon: Globe },
  { name: "Testimonials", href: "#testimonials", icon: MessageSquare },
  { name: "Contact", href: "#contact", icon: Mail },
]

const skills = [
  { name: "Machine learning (ML)/Deep Learning (DL)", level: 95, category: "AIML" },
  { name: "React/Next.js", level: 95, category: "Frontend" },
  { name: "Node.js/Express.js", level: 92, category: "Backend" },
  { name: "Hadoop/Big Data", level: 90, category: "Big Data" },
  { name: "Java", level: 88, category: "Language" },
  { name: "Python/Jupyter", level: 87, category: "Language/Data Science" },
  { name: "SQL", level: 85, category: "Database" },
  { name: "TypeScript", level: 85, category: "Language" },
  { name: "C/C++", level: 82, category: "Language" },
  { name: "HTML/CSS/JavaScript", level: 90, category: "Frontend" },
  { name: "AWS/Cloud", level: 80, category: "DevOps" },
  { name: "MongoDB", level: 78, category: "Database" },
  { name: "Docker", level: 75, category: "DevOps" },
]
const experiences = [
  {
    title: "Lead Developer – Nagar Seva (Smart City Utility Platform)",
    company: "Chandigarh University",
    period: "Dec 2023 – Present",
    location: "Mohali, Punjab",
    description:
      "Developing a smart city web platform called 'Nagar Seva' to streamline public service requests like waste management, streetlight issues, and water complaints. The project aims to bridge the gap between citizens and municipal bodies through a digital complaint resolution system.",
    achievements: [
      "Selected in top 3 phases of Project Expo and HackIndia 2024",
      "Presented at CAB (Centre for Advanced Brainstorming) inside university",
      "Implements real-time complaint tracking and admin resolution panel",
      "Currently under development with plans to scale and deploy with CU support",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Firebase", "Express.js"],
  },
  {
    title: "Full Stack Web Developer (Personal Projects)",
    company: "Self-Initiated",
    period: "2022 – Present",
    location: "Remote / Chandigarh University",
    description:
      "Built and deployed multiple full stack web projects with real-world use cases, including games, authentication systems, and cloud database integration.",
    achievements: [
      "Created a live test-giving platform for students with real-time question rendering and results",
      "Developed classic games like Tic Tac Toe and Ludo using HTML, CSS, and JavaScript",
      "Implemented Firebase Authentication with custom Login UI",
      "Worked with MongoDB Atlas for cloud database integration",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Firebase", "MongoDB Atlas"],
  },
  {
    title: "AI Chatbot UI Developer",
    company: "Open Source Project",
    period: "Mar 2024 – Apr 2024",
    location: "GitHub",
    description:
      "Designed and implemented an animated and responsive AI Chatbot interface for frontend demos. Focused on user experience, CSS animation, and responsive design.",
    achievements: [
      "Used JavaScript for dynamic message rendering",
      "Integrated animated transitions for chat interaction",
      "Styled with custom CSS for polished look",
      "Maintained a modular and scalable folder structure",
    ],
    technologies: ["JavaScript", "HTML", "CSS"],
  },
  {
    title: "Java Backend Developer – Shipment Tracker",
    company: "Academic Project, Chandigarh University",
    period: "Aug 2023 – Oct 2023",
    location: "Mohali, Punjab",
    description:
      "Created a Shipment Tracking System using Java and JDBC for database connectivity. Designed a desktop-based UI with real-time tracking functionalities.",
    achievements: [
      "Built CRUD operations for shipment status management",
      "Connected Java frontend with MySQL backend using JDBC",
    ],
    technologies: ["Java", "JDBC", "MySQL", "Swing"],
  },
  {
    title: "Firebase Auth System – Secure Login UI",
    company: "Freelance Prototype",
    period: "Nov 2023 – Dec 2023",
    location: "Remote",
    description:
      "Developed a secure login system using Firebase Authentication and Firestore for data handling. Focused on user interface and frontend validation.",
    achievements: [
      "Integrated Firebase email/password auth",
      "Styled with CSS for a smooth, modern UI",
      "Added Firestore for user data storage",
    ],
    technologies: ["Firebase", "CSS", "JavaScript", "Firestore"],
  },
]

const projects = [
  {
    title: "Nagar Seva – Smart Complaint Management",
    description:
      "Civic tech platform to manage public grievances like garbage collection, water issues, and electricity faults. Recognized in HackIndia and Project Expo up to 3rd phase.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["React", "Node.js", "MongoDB", "Firebase"],
    link: "#",
    github: "https://github.com/AmitKumar9430",
  },
  {
    title: "Student Test Platform",
    description:
      "Live web application that allows students to attempt online tests, submit answers, and view scores. Developed with Firebase backend.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["HTML", "CSS", "JavaScript", "Firebase"],
    link: "#",
    github: "https://github.com/AmitKumar9430",
  },
  {
    title: "AI Chatbot UI",
    description:
      "A clean, animated chatbot UI built using HTML, CSS, and JavaScript. Features message animations and responsive layout.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "#",
    github: "https://github.com/AmitKumar9430",
  },
  {
    title: "Game Zone – Tic Tac Toe & Ludo",
    description:
      "Fun and interactive browser-based games. Designed and developed for mobile and desktop using HTML5 and JavaScript.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "#",
    github: "https://github.com/AmitKumar9430",
  },
  {
    title: "Login & Authentication System",
    description:
      "Secure login UI with Firebase Authentication and Firestore for user data storage. Focused on a clean UI and auth logic.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["CSS", "JavaScript", "Firebase", "Firestore"],
    link: "#",
    github: "https://github.com/AmitKumar9430",
  },
  {
    title: "Java JDBC Shipment Tracker",
    description: "Java desktop application to manage shipment records using JDBC with MySQL. Built with Swing UI.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["Java", "JDBC", "MySQL"],
    link: "#",
    github: "https://github.com/AmitKumar9430",
  },
  {
    title: "MongoDB Atlas Cloud Integration",
    description: "Tutorial and demo project on how to display and manage data from MongoDB Atlas in a web application.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["JavaScript", "MongoDB Atlas"],
    link: "#",
    github: "https://github.com/AmitKumar9430",
  },
]

const livePages = [
  {
    title: "CUNPTEL Cloud Exam Practice App",
    description:
      "An interactive web app to practice cloud certification exam questions, helping users prepare effectively with real-time feedback and analytics.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Education",
    tech: ["React", "Firebase", "Tailwind CSS"],
    link: "https://cunptelcloudexampracticeapp-amitsingh.netlify.app/",
    icon: FileText,
  },
  {
    title: "Amit Singh's Games Collection",
    description:
      "Explore a variety of fun and engaging games created by Amit Singh. Visit the site to enjoy classic and modern browser games.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Gaming",
    tech: ["HTML5", "JavaScript", "CSS3"],
    link: "https://amitsinghwithdiffrentgames.netlify.app",
    icon: GamepadIcon,
  },
  {
    title: "Nagar Seva – Coming Soon",
    description:
      "Smart complaint management platform for civic issues like garbage, water, and electricity. Launching soon to make public grievance handling efficient.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Civic Tech",
    tech: ["React", "Node.js", "MongoDB", "Firebase"],
    link: "#",
    icon: Globe, // or choose another icon if you prefer
  },
  {
    title: "Thank You Note",
    description: "A simple thank you page expressing gratitude for business and encouraging future collaboration.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Business",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://amitsinghwithdiffrentgames.netlify.app",
    icon: Globe,
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio showcasing my work and skills",
    image: "/placeholder.svg?height=200&width=300",
    category: "Portfolio",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "#",
    icon: FileText,
  },
  {
    title: "E-Commerce Store",
    description: "Modern online store with shopping cart and payment integration",
    image: "/placeholder.svg?height=200&width=300",
    category: "E-Commerce",
    tech: ["React", "Stripe", "Node.js"],
    link: "#",
    icon: ShoppingCart,
  },

  {
    title: "Game Dashboard",
    description: "Gaming statistics and leaderboard application",
    image: "/placeholder.svg?height=200&width=300",
    category: "Gaming",
    tech: ["Angular", "Chart.js", "Firebase"],
    link: "#",
    icon: GamepadIcon,
  },
  {
    title: "Business Landing",
    description: "Corporate landing page with contact forms and animations",
    image: "/placeholder.svg?height=200&width=300",
    category: "Business",
    tech: ["HTML5", "CSS3", "JavaScript"],
    link: "#",
    icon: Globe,
  },
]

const testimonials = [
  {
    name: "Dr. Ritu Bansal",
    role: "Dean, Department of Computer Science at Chandigarh University",
    content:
      "The professionalism and dedication shown in developing student-focused applications was truly commendable. The project met our academic goals and exceeded expectations.",
    rating: 5,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Manish Verma",
    role: "Intel Certified Trainer at Chandigarh University",
    content:
      "A brilliant mind with a great grasp on Intel’s oneAPI toolkit. Delivered an optimized project during the AI Bootcamp that impressed the panel.",
    rating: 5,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Simran Kaur",
    role: "Event Coordinator, Tech Invent 2024 at CU",
    content:
      "Handled the live event portal flawlessly. From registrations to result processing, the system worked without a glitch. A huge asset during Tech Invent!",
    rating: 5,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Amit Singh",
    role: "Lead Developer, Tech Invent Team at CU",
    content:
      "Built a robust backend for our university’s flagship tech fest. Always delivered quality work on time with zero downtime during the event.",
    rating: 5,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Amit Singh",
    role: "Lead Developer, Tech Invent Team at CU",
    content:
      "Built a robust backend for our university’s flagship tech fest. Always delivered quality work on time with zero downtime during the event.",
    rating: 5,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Amit Singh",
    role: "Lead Developer, Tech Invent Team at CU",
    content:
      "Built a robust backend for our university’s flagship tech fest. Always delivered quality work on time with zero downtime during the event.",
    rating: 5,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Manish Verma",
    role: "Intel Certified Trainer at Chandigarh University",
    content:
      "A brilliant mind with a great grasp on Intel’s oneAPI toolkit. Delivered an optimized project during the AI Bootcamp that impressed the panel.",
    rating: 5,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Simran Kaur",
    role: "Event Coordinator, Tech Invent 2024 at CU",
    content:
      "Handled the live event portal flawlessly. From registrations to result processing, the system worked without a glitch. A huge asset during Tech Invent!",
    rating: 5,
    avatar: "/placeholder.svg?height=50&width=50",
  },
]

// Social media links
const socialLinks = {
  github: "https://github.com/AmitKumar9430",
  instagram: "https://www.instagram.com/_amit_singh_30?igsh=MTZpbWM4dXdwZzVqMw==",
  facebook: "https://www.facebook.com/singh.amit.5811877",
  twitter: "https://x.com/AmitBab80148598?t=pI45Kasb0Mnuc195VYEg0g&s=09",
  linkedin: "https://www.linkedin.com/in/amit-kumar-9t5m2i3a",
}

// Animated Counter Component
const AnimatedCounter: FunctionComponent<{ end: number; duration?: number }> = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}

// Typing Animation Component
const TypingAnimation = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }
      },
      delay + currentIndex * 100,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay])

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="inline-block w-1 h-8 bg-purple-400 ml-1"
      />
    </span>
  )
}

// Floating Elements Component
const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

// HorizontalSlider Component
const HorizontalSlider: FunctionComponent<{
  children: React.ReactNode
  itemsPerSlide?: number
  columns?: number
  itemsPerRow?: number
}> = ({ children, itemsPerSlide = 4, columns = 2, itemsPerRow }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    const container = containerRef.current
    if (!container) return

    const scrollAmount = container.clientWidth * 0.8 // Scroll 80% of the container width
    if (direction === "left") {
      container.scrollTo({
        left: container.scrollLeft - scrollAmount,
        behavior: "smooth",
      })
    } else {
      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: "smooth",
      })
    }
    setScrollPosition(container.scrollLeft)
  }

  // Group children into chunks based on itemsPerSlide
  const childrenArray = React.Children.toArray(children)
  const slides = []
  for (let i = 0; i < childrenArray.length; i += itemsPerSlide) {
    slides.push(childrenArray.slice(i, i + itemsPerSlide))
  }

  return (
    <div className="relative">
      <div ref={containerRef} className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            className={`snap-start flex-shrink-0 w-full grid gap-4 sm:gap-8 px-4 grid-cols-1 sm:grid-cols-${columns}`}
          >
            {slide}
          </div>
        ))}
      </div>
      {/* Navigation Arrows */}
      <motion.button
        onClick={() => handleScroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-purple-600/80 hover:bg-purple-700 text-white p-2 sm:p-3 rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </motion.button>
      <motion.button
        onClick={() => handleScroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-purple-600/80 hover:bg-purple-700 text-white p-2 sm:p-3 rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </motion.button>
    </div>
  )
}

// Grid Slider Component for Projects and Live Pages
const GridSlider: FunctionComponent<{
  children: React.ReactNode
  itemsPerPage?: number
}> = ({ children, itemsPerPage = 3 }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const childrenArray = React.Children.toArray(children)
  const totalPages = Math.ceil(childrenArray.length / itemsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const currentItems = childrenArray.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <div className="relative">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {currentItems}
      </motion.div>

      {/* Navigation Arrows */}
      {totalPages > 1 && (
        <>
          <motion.button
            onClick={prevPage}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-purple-600/80 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>
          <motion.button
            onClick={nextPage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-purple-600/80 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        </>
      )}

      {/* Page Indicators */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPage ? "bg-purple-500 scale-125" : "bg-purple-300/50 hover:bg-purple-400/70"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(true)

  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Set initial width
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth)
      window.addEventListener("resize", handleResize)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map((item) => item.href.slice(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    // Check if Supabase environment variables are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    setIsSupabaseConfigured(!!supabaseUrl)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus("idle")

    try {
      console.log("Submitting form data:", formData)

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Contact Form Submission",
          message: formData.message,
        }),
      })

      // Get the response text first for debugging
      const responseText = await response.text()
      console.log("Raw response:", responseText)

      // Try to parse the response as JSON
      let result
      try {
        result = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Error parsing response:", parseError)
        setSubmitStatus("error")
        return
      }

      if (response.ok && result.success) {
        setSubmitStatus("success")
        console.log("Form submitted successfully")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
        console.error("Form submission failed:", result.error, result.details)
      }
    } catch (error) {
      setSubmitStatus("error")
      console.error("Error submitting form:", error)
    }
  }

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex relative">
      <FloatingElements />

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 z-50 h-full w-[85vw] sm:w-72 bg-gradient-to-b from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-lg border-r border-purple-500/20 lg:w-72"
          >
            <div className="flex flex-col h-full p-4 sm:p-6">
              {/* Profile Section in Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center mb-8 w-full"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="relative">
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(168, 85, 247, 0.4)",
                          "0 0 30px rgba(168, 85, 247, 0.6)",
                          "0 0 20px rgba(168, 85, 247, 0.4)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="w-[50px] h-[50px] rounded-full border-2 border-purple-500/50 overflow-hidden"
                    >
                      <Image
                        src="/images/profile.jpg"
                        alt="Amit Kumar"
                        width={50}
                        height={50}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Amit Kumar</h2>
                    <p className="text-sm text-gray-400">Software Engineer</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="text-white hover:bg-purple-500/20 transition-all duration-300"
                  aria-label="Close sidebar"
                >
                  <X className="h-5 w-5" />
                </Button>
              </motion.div>

              <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <motion.button
                        onClick={() => scrollToSection(item.href)}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          activeSection === item.href.slice(1)
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                            : "text-gray-300 hover:bg-purple-500/20 hover:text-white"
                        }`}
                      >
                        <motion.div
                          animate={activeSection === item.href.slice(1) ? { rotate: 360 } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon className="h-5 w-5" />
                        </motion.div>
                        <span className="font-medium">{item.name}</span>
                        {activeSection === item.href.slice(1) && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
                            <ChevronRight className="h-4 w-4 ml-auto" />
                          </motion.div>
                        )}
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-auto"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="mb-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20"
                >
                  <p className="text-sm text-gray-300 mb-2">Available for Hearing</p>
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                    <span className="text-xs text-green-400">Online</span>
                  </div>
                </motion.div>
                <div className="flex space-x-3 justify-center">
                  {[
                    { Icon: Github, href: socialLinks.github },
                    { Icon: Instagram, href: socialLinks.instagram },
                    { Icon: Facebook, href: socialLinks.facebook },
                    { Icon: Twitter, href: socialLinks.twitter },
                    { Icon: Linkedin, href: socialLinks.linkedin },
                  ].map(({ Icon, href }, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-300 hover:text-white hover:bg-purple-500/20 transition-all duration-300"
                        asChild
                      >
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          <Icon className="h-5 w-5" />
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button - works for both mobile and desktop */}
      {!sidebarOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-4 z-50"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="text-white hover:bg-purple-700/30 bg-gray-900/80 backdrop-blur-sm border border-purple-600/30 rounded-lg transition-all duration-300"
            aria-label="Open sidebar"
          >
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-5 w-5" />
            </motion.div>
          </Button>
        </motion.div>
      )}
      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-72" : "lg:ml-0"}`}>
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 relative overflow-hidden"
        >
          {/* Background animated elements */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 blur-3xl"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 2,
                }}
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${20 + i * 20}%`,
                }}
              />
            ))}
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6"
              >
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  <TypingAnimation text="Amit" delay={1000} />
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8"
              >
                <TypingAnimation
                  text="Well-Experienced in Full-Stack Innovator, Big Data Specialist, Code Architect, Tech Visionary....Etc."
                  delay={0}
                />
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Passionate about creating innovative solutions for businesses of all sizes. Specializing in modern web
                technologies and scalable applications.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => scrollToSection("#contact")}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg shadow-lg shadow-purple-500/25 w-full sm:w-auto"
                  >
                    Get In Touch
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </motion.div>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/20 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg w-full sm:w-auto"
                    asChild
                  >
                    <a href="/files/amit-kumar-cv.pdf" download="Amit-Kumar-CV.pdf">
                      Download CV
                      <Download className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 4, repeat: Number.POSITIVE_INFINITY },
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-30"
                />
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] rounded-full border-4 border-purple-500/50 shadow-2xl bg-gradient-to-br from-purple-600 to-pink-600 overflow-hidden"
                >
                  <Image
                    src="/images/profile.jpg"
                    alt="Amit Kumar"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute top-10 right-10 w-6 h-6 bg-yellow-400 rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  className="absolute bottom-20 left-10 w-4 h-4 bg-blue-400 rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 px-4 sm:px-6 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
              >
                About Me
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto"
              >
                I’m a passionate developer who brings creativity, logic, and modern tech together to build impactful web
                solutions.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">My Journey</h3>
                <p className="text-gray-300 mb-4 text-sm sm:text-base leading-tight">
                  I'm a self-motivated developer with strong hands-on experience in full-stack development. From
                  building civic platforms like <strong>Nagar Seva</strong> to fun projects like{" "}
                  <strong>Game Zone</strong>, I enjoy creating projects that combine usefulness with interactivity.
                </p>
                <p className="text-gray-300 mb-4 text-sm sm:text-base leading-tight">
                  My stack includes technologies like <strong>React</strong>, <strong>Firebase</strong>,{" "}
                  <strong>Node.js</strong>, and <strong>MongoDB</strong>. I also work on frontend design, deployment,
                  database management, and user authentication. I thrive on building and deploying real-world apps.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className="text-center p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-xl sm:text-2xl font-bold text-purple-400 mb-1"
                    >
                      <AnimatedCounter end={20} />+
                    </motion.div>
                    <div className="text-sm text-gray-300">Projects Built</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: -5 }}
                    className="text-center p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-xl sm:text-2xl font-bold text-purple-400 mb-1"
                    >
                      <AnimatedCounter end={3} />+
                    </motion.div>
                    <div className="text-sm text-gray-300">Years Learning & Growing</div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">What I Offer</h3>
                <div className="space-y-2">
                  {[
                    "Full-Stack Web App Development",
                    "Firebase & MongoDB Integrations",
                    "RESTful API & Backend Services",
                    "Responsive UI/UX with Tailwind CSS",
                    "Authentication with Firebase/Auth",
                    "Project Deployment on Netlify/Vercel",
                    "Creative Game Development in JS",
                    "Practical Coding Solutions & Demos",
                  ].map((service, index) => (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-2 p-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                      >
                        <ChevronRight className="h-4 w-4 text-purple-400" />
                      </motion.div>
                      <span className="text-sm sm:text-base text-gray-300">{service}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 sm:py-28 px-4 sm:px-6 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16 sm:mb-20"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8"
              >
                Skills & Expertise
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
              >
                Proficient in modern technologies and frameworks
              </motion.p>
            </motion.div>

            <HorizontalSlider itemsPerSlide={windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 4}>
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, rotateX: -30 }}
                  whileInView={{ opacity: 1, rotateX: 0 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 25px 50px rgba(168, 85, 247, 0.3)",
                  }}
                  transition={{ delay: (index % 4) * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="p-5 sm:p-7 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-base sm:text-lg font-semibold text-white">{skill.name}</h3>
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs"
                      >
                        {skill.category}
                      </Badge>
                    </motion.div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mb-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ delay: (index % 4) * 0.1 + 0.5, duration: 1.5, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-2.5 rounded-full relative"
                    >
                      <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute inset-0 bg-white/20 rounded-full"
                      />
                    </motion.div>
                  </div>
                  <div className="text-right text-sm text-gray-400">{skill.level}%</div>
                </motion.div>
              ))}
            </HorizontalSlider>
          </div>
        </section>
        {/* Experience Section */}
        <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                Professional Experience
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
              >
                My journey through various roles and companies
              </motion.p>
            </motion.div>

            <HorizontalSlider itemsPerSlide={1} columns={1}>
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.title}
                  initial={{ opacity: 0, rotateX: -15 }}
                  whileInView={{ opacity: 1, rotateX: 0 }}
                  whileHover={{ scale: 1.02, rotateY: 2 }}
                  transition={{ delay: (index % 1) * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                    <CardContent className="p-4 sm:p-8">
                      <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                              <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-xl sm:text-2xl font-bold text-white mb-2"
                              >
                                {experience.title}
                              </motion.h3>
                              <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-base sm:text-lg text-purple-400 mb-2"
                              >
                                {experience.company}
                              </motion.p>
                            </div>
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5, duration: 0.5 }}
                              viewport={{ once: true }}
                              className="text-right"
                            >
                              <p className="text-gray-300 font-medium">{experience.period}</p>
                              <p className="text-gray-400 text-sm">{experience.location}</p>
                            </motion.div>
                          </div>
                          <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-gray-300 mb-6 leading-relaxed"
                          >
                            {experience.description}
                          </motion.p>
                          <div className="mb-6">
                            <motion.h4
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: 0.7, duration: 0.5 }}
                              viewport={{ once: true }}
                              className="text-base sm:text-lg font-semibold text-white mb-3"
                            >
                              Key Achievements:
                            </motion.h4>
                            <ul className="space-y-2">
                              {experience.achievements.map((achievement, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  whileHover={{ x: 5 }}
                                  transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                                  viewport={{ once: true }}
                                  className="flex items-center space-x-3"
                                >
                                  <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 }}
                                  >
                                    <ChevronRight className="h-4 w-4 text-purple-400" />
                                  </motion.div>
                                  <span className="text-gray-300">{achievement}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9, duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Technologies Used:</h4>
                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech, i) => (
                              <motion.div
                                key={tech}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                                viewport={{ once: true }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                >
                                  {tech}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </HorizontalSlider>
          </div>
        </section>
        {/* Projects Section */}
        <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                Featured Projects
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
              >
                A showcase of my recent work and achievements
              </motion.p>
            </motion.div>

            <HorizontalSlider itemsPerSlide={windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3} columns={3}>
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, rotateY: -15 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 25px 50px rgba(168, 85, 247, 0.3)",
                  }}
                  transition={{ delay: (index % 3) * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group overflow-hidden h-full">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex items-center justify-center"
                        >
                          <motion.div initial={{ scale: 0 }} whileHover={{ scale: 1 }} transition={{ delay: 0.1 }}>
                            <Sparkles className="h-12 w-12 text-white" />
                          </motion.div>
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 flex flex-col flex-grow">
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex-grow"
                      >
                        <CardTitle className="text-white mb-3">{project.title}</CardTitle>
                        <p className="text-gray-300 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech, i) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.1 }}
                              transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
                              viewport={{ once: true }}
                            >
                              <Badge
                                variant="secondary"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                        <div className="flex space-x-4 mt-auto">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
                              asChild
                            >
                              <a href={project.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Live Demo
                              </a>
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
                              asChild
                            >
                              <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4 mr-2" />
                                Code
                              </a>
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </HorizontalSlider>
          </div>
        </section>
        {/*live -page project*/}
        <section id="live-pages" className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                Live Pages & Demos
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
              >
                Interactive demonstrations of various web applications and designs
              </motion.p>
            </motion.div>

            <HorizontalSlider itemsPerSlide={windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3} columns={3}>
              {livePages.map((page, index) => (
                <motion.div
                  key={page.title}
                  initial={{ opacity: 0, rotateX: -20 }}
                  whileInView={{ opacity: 1, rotateX: 0 }}
                  whileHover={{
                    scale: 1.03,
                    rotateY: 3,
                    boxShadow: "0 20px 40px rgba(168, 85, 247, 0.25)",
                  }}
                  transition={{ delay: (index % 3) * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group h-full overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                          <Image
                            src={page.image || "/placeholder.svg"}
                            alt={page.title}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          viewport={{ once: true }}
                          className="absolute top-4 left-4"
                        >
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <page.icon className="h-3 w-3 mr-1" />
                            </motion.div>
                            {page.category}
                          </Badge>
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 flex flex-col flex-grow">
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex-grow"
                      >
                        <CardTitle className="text-white mb-3">{page.title}</CardTitle>
                        <p className="text-gray-300 mb-4 flex-grow">{page.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {page.tech.map((tech, i) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.1 }}
                              transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                              viewport={{ once: true }}
                            >
                              <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <Button
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          asChild
                        >
                          <a href={page.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Live Page
                          </a>
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </HorizontalSlider>
          </div>
        </section>
        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 px-6 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                Testimonials
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                What Professionals say about working with me
              </motion.p>
            </motion.div>

            <HorizontalSlider
              itemsPerSlide={1} // Each slide contains a 2x2 grid
              columns={1} // Treat the grid as a single item per slide
            >
              {Array(Math.ceil(testimonials.length / 4))
                .fill()
                .map((_, slideIndex) => (
                  <div key={slideIndex} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {testimonials.slice(slideIndex * 4, slideIndex * 4 + 4).map((testimonial, index) => (
                      <motion.div
                        key={testimonial.name}
                        initial={{ opacity: 0, rotateY: -20 }}
                        whileInView={{ opacity: 1, rotateY: 0 }}
                        whileHover={{
                          scale: 1.05,
                          rotateY: 5,
                          boxShadow: "0 25px 50px rgba(168, 85, 247, 0.3)",
                        }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                      >
                        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 h-full">
                          <CardContent className="p-6">
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                              viewport={{ once: true }}
                              className="flex items-center mb-4"
                            >
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, rotate: -180 }}
                                  whileInView={{ opacity: 1, rotate: 0 }}
                                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                                  viewport={{ once: true }}
                                >
                                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                </motion.div>
                              ))}
                            </motion.div>
                            <motion.p
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: 0.5, duration: 0.5 }}
                              viewport={{ once: true }}
                              className="text-gray-300 mb-6 italic"
                            >
                              "{testimonial.content}"
                            </motion.p>
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6, duration: 0.5 }}
                              viewport={{ once: true }}
                              className="flex items-center space-x-4"
                            >
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold"
                              >
                                {testimonial.name.charAt(0)}
                              </motion.div>
                              <div>
                                <div className="font-semibold text-white">{testimonial.name}</div>
                                <div className="text-sm text-gray-400">{testimonial.role}</div>
                              </div>
                            </motion.div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ))}
            </HorizontalSlider>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                Get In Touch
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                Ready to start your next project? Let's discuss how I can help bring your ideas to life.
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
                <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email", value: "23bcs12621@cuchd.in" },
                    { icon: Phone, label: "Phone", value: "+91-9523974130" },
                    { icon: MapPin, label: "Location", value: "Dumariya ,Gaya, Bihar ,India " },
                    { icon: Calendar, label: "Availability", value: "Available for new projects" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                      >
                        <item.icon className="h-6 w-6 text-purple-400" />
                      </motion.div>
                      <div>
                        <div className="font-semibold text-white">{item.label}</div>
                        <div className="text-gray-300">{item.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {isSupabaseConfigured ? (
                  <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white">Send a Message</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          viewport={{ once: true }}
                          className="grid md:grid-cols-2 gap-4"
                        >
                          <div>
                            <Input
                              placeholder="Your Name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 transition-all duration-300"
                              required
                            />
                          </div>
                          <div>
                            <Input
                              type="email"
                              placeholder="Your Email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 transition-all duration-300"
                              required
                            />
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <Input
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 transition-all duration-300"
                            required
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <Textarea
                            placeholder="Your Message"
                            rows={5}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 transition-all duration-300"
                            required
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25"
                          >
                            Send Message
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <Send className="ml-2 h-5 w-5" />
                            </motion.div>
                          </Button>
                        </motion.div>
                      </form>
                      {submitStatus === "success" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-md text-green-400 text-center"
                        >
                          Message sent successfully! I'll get back to you soon.
                        </motion.div>
                      )}

                      {submitStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-400 text-center"
                        >
                          Failed to send message. Please try again later.
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <ContactFormFallback />
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 bg-black/40 border-t border-purple-500/20">
          <div className="max-w-6xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-400 mb-4"
            >
              © 2024 Amit Kumar - Software Engineer. All rights reserved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex justify-center space-x-6"
            >
              {[
                { Icon: Github, href: "https://github.com/AmitKumar9430" },
                { Icon: Instagram, href: "https://www.instagram.com/_amit_singh_30?igsh=MTZpbWM4dXdwZzVqMw==" },
                { Icon: Facebook, href: "https://www.facebook.com/singh.amit.5811877" },
                { Icon: Twitter, href: "https://x.com/AmitBab80148598?t=pI45Kasb0Mnuc195VYEg0g&s=09" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/amit-kumar-9t5m2i3a" },
              ].map(({ Icon, href }, index) => (
                <motion.div key={index} whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-purple-500/20 transition-all duration-300"
                    asChild
                  >
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </footer>
      </div>

      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
