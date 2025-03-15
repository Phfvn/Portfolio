"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

// Simulated portfolio data
const projects = [
  {
    id: 1,
    title: "Neuomorphic Dashboard",
    description:
      "A unique admin interface with depth and tactility. This dashboard provides an intuitive way to visualize complex data with a modern design approach that emphasizes shadows and subtle gradients to create a sense of physical depth.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    color: "#2dd4bf",
    image: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example",
  },
  {
    id: 2,
    title: "Immersive Learning Platform",
    description:
      "Educational platform with interactive 3D elements that transform traditional learning into an engaging experience. Students can manipulate virtual objects, explore complex concepts through spatial visualization, and track their progress through gamified elements.",
    tags: ["Next.js", "Three.js", "TypeScript"],
    color: "#8b5cf6",
    image: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example",
  },
  {
    id: 3,
    title: "Ambient Music Generator",
    description:
      "AI-powered tool for creating atmospheric soundscapes based on mood, environment, and user preferences. The application uses machine learning to analyze patterns in ambient music and generates unique compositions that adapt to the user's input parameters.",
    tags: ["TensorFlow.js", "Web Audio API", "React"],
    color: "#f43f5e",
    image: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example",
  },
  {
    id: 4,
    title: "Generative Art Engine",
    description:
      "Algorithm-based tool for creating unique visual patterns that can be customized through various parameters. Users can adjust complexity, color schemes, and animation properties to generate artwork that can be exported as high-resolution images or animations.",
    tags: ["Canvas API", "p5.js", "Node.js"],
    color: "#f97316",
    image: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example",
  },
]

const skills = [
  { name: "Frontend Development", level: 90, color: "#06b6d4" },
  { name: "UI/UX Design", level: 85, color: "#8b5cf6" },
  { name: "Backend Development", level: 75, color: "#22c55e" },
  { name: "Creative Coding", level: 80, color: "#f97316" },
  { name: "3D Visualization", level: 70, color: "#f43f5e" },
]

const experience = [
  {
    year: "2023",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    description:
      "Led development of interactive web applications, mentored junior developers, and implemented modern frontend architecture using React and TypeScript.",
  },
  {
    year: "2021",
    title: "Frontend Developer",
    company: "Creative Digital Agency",
    description:
      "Built responsive websites and interactive experiences for major clients across various industries using modern JavaScript frameworks and animation libraries.",
  },
  {
    year: "2019",
    title: "Junior Web Developer",
    company: "StartUp Ventures",
    description:
      "Contributed to building the company's flagship product, focusing on UI components and responsive design implementation.",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "Brand Co",
    quote:
      "Working with this developer was a game-changer for our company. The attention to detail and creative solutions exceeded our expectations.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    company: "TechLaunch",
    quote:
      "Incredibly responsive and professional. Delivered our project on time and with features we hadn't even thought of. Highly recommended!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Emma Rodriguez",
    role: "Product Manager",
    company: "SaaS Platform",
    quote:
      "The developer's ability to translate our complex requirements into an intuitive interface was impressive. Our users love the result.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "David Kim",
    role: "Creative Director",
    company: "Design Studio",
    quote:
      "Rare to find a developer with both technical expertise and an eye for design. The collaborative process was smooth and the outcome was exceptional.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

// Remove the custom cursor completely
// Replace CustomCursor component with a simplified version that doesn't use hooks or state
const CustomCursor = memo(({ cursorText }: { cursorText: string }) => {
  // Return null - effectively disabling the custom cursor
  return null
})

CustomCursor.displayName = "CustomCursor"

// Animated background particles component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    const colors = ["#8b5cf6", "#ec4899", "#06b6d4", "#22c55e"]
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    // Animation loop
    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.3
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, []) // Empty dependency array - only run once

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
}

// Navigation node component - optimized to prevent blinking
interface NavNodeProps {
  id: string
  label: string
  x: number
  y: number
  color?: string
  active?: boolean
  onClick: () => void
}

const NavNode = memo(({ id, label, x, y, color = "#4f46e5", active = false, onClick }: NavNodeProps) => (
  <motion.div
    className={`absolute cursor-pointer select-none ${active ? "z-10" : "z-0"}`}
    style={{ top: `${y}%`, left: `${x}%` }}
    initial={{ scale: 0 }}
    animate={{
      scale: active ? 1.2 : 1,
      opacity: active ? 1 : 0.7,
    }}
    whileHover={{ scale: 1.2, opacity: 1 }}
    onClick={onClick}
    transition={{ duration: 0.3 }}
  >
    <div className="relative flex items-center justify-center">
      <motion.div
        className="absolute w-10 h-10 rounded-full opacity-30"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <div className="w-5 h-5 rounded-full z-10" style={{ backgroundColor: color }}></div>
      <div className="absolute whitespace-nowrap px-3 py-1 bg-gray-800 text-white rounded-full -bottom-8">{label}</div>
    </div>
  </motion.div>
))

NavNode.displayName = "NavNode"

// Main portfolio component

// Fix the mouse position effect to use a throttled update
// Add this function at the top level, outside of any component
function throttle<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

const InteractivePortfolio = () => {
  const [activeSection, setActiveSection] = useState("intro")
  const [cursorText, setCursorText] = useState("")
  const [isExploring, setIsExploring] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Form state for contact section
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate
    const newErrors = {
      name: formData.name ? "" : "Name is required",
      email: !formData.email ? "Email is required" : !/^\S+@\S+\.\S+$/.test(formData.email) ? "Email is invalid" : "",
      message: formData.message ? "" : "Message is required",
    }

    setErrors(newErrors)

    // If no errors, submit form
    if (!Object.values(newErrors).some((error) => error)) {
      // Submit form logic
      console.log("Form submitted:", formData)
      // Show success message
      alert("Message sent successfully!")
      // Reset form
      setFormData({ name: "", email: "", message: "" })
    }
  }

  const setSection = useCallback((section: string, text = "") => {
    setActiveSection(section)
    setCursorText(text)
  }, [])

  const startExploring = useCallback(() => {
    setIsExploring(true)
    setTimeout(() => setSection("map"), 800)
  }, [setSection])

  const toggleDarkMode = useCallback(() => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem("portfolio-theme", newMode ? "dark" : "light")
  }, [isDarkMode])

  // Then update the mouse position effect in the InteractivePortfolio component:
  // Handle mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      // Calculate mouse position as percentage of screen
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      setMousePosition({ x, y })
    }, 50) // Only update every 50ms

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Arrow key navigation
      if (activeSection === "map") {
        switch (e.key) {
          case "ArrowUp":
            setSection("about")
            break
          case "ArrowRight":
            setSection("projects")
            break
          case "ArrowDown":
            setSection("skills")
            break
          case "ArrowLeft":
            setSection("contact")
            break
        }
      } else if (e.key === "Escape") {
        // Escape key to go back to map
        if (selectedProject) {
          setSelectedProject(null)
        } else {
          setSection("map")
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeSection, selectedProject, setSection])

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
    }
  }, [])

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Scroll animation for longer sections
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const items = container.querySelectorAll(".animate-on-scroll")

      items.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight * 0.8

        if (isVisible) {
          item.classList.add("animate-visible")
        }
      })
    }

    // Use a timeout to ensure the DOM is ready
    const timer = setTimeout(() => {
      handleScroll()
    }, 100)

    container.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      container.removeEventListener("scroll", handleScroll)
    }
  }, [activeSection])

  // Section components
  const IntroSection = () => (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center text-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-tight leading-tight"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="block">Creative</span>
        <span className="block">Developer</span>
      </motion.h1>
      <motion.div
        className="text-xl md:text-3xl mb-8 text-gray-600 dark:text-gray-300"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Building digital experiences that inspire
      </motion.div>
      <motion.button
        className="mt-8 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full text-xl font-medium transition-all hover:px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={startExploring}
        onMouseEnter={() => setCursorText("Explore")}
        onMouseLeave={() => setCursorText("")}
      >
        Enter Portfolio
      </motion.button>
    </motion.div>
  )

  const MapSection = () => (
    <motion.div
      className="h-full w-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background grid effect with parallax */}
      {/* In the MapSection component, update the background grid div: */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

      <div className="absolute top-5 left-5 text-2xl font-semibold">Portfolio Map</div>

      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-5 right-5 p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>

      {/* Navigation nodes */}
      <NavNode
        id="about"
        label="About"
        x={25}
        y={30}
        color="#06b6d4"
        active={activeSection === "about"}
        onClick={() => setSection("about")}
      />
      <NavNode
        id="projects"
        label="Projects"
        x={65}
        y={40}
        color="#8b5cf6"
        active={activeSection === "projects"}
        onClick={() => setSection("projects")}
      />
      <NavNode
        id="skills"
        label="Skills"
        x={40}
        y={65}
        color="#22c55e"
        active={activeSection === "skills"}
        onClick={() => setSection("skills")}
      />
      <NavNode
        id="testimonials"
        label="Testimonials"
        x={15}
        y={70}
        color="#f59e0b"
        active={activeSection === "testimonials"}
        onClick={() => setSection("testimonials")}
      />
      <NavNode
        id="contact"
        label="Contact"
        x={80}
        y={75}
        color="#f43f5e"
        active={activeSection === "contact"}
        onClick={() => setSection("contact")}
      />

      <motion.div
        className="absolute bottom-5 left-5 text-sm text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Click on a node to navigate or use arrow keys
      </motion.div>
    </motion.div>
  )

  const AboutSection = () => (
    <motion.div
      ref={containerRef}
      className="h-full w-full flex flex-col items-center justify-start p-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="max-w-2xl mx-auto text-center mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-xl mb-6">
          I'm a creative developer with a passion for building interactive digital experiences that surprise and delight
          users.
        </p>
        <p className="text-lg mb-8">
          With expertise spanning frontend development, UX design, and creative coding, I blur the lines between
          technology and art to create memorable web experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <motion.div
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 text-white"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-bold mb-2">Background</h3>
            <p>
              7+ years of experience in web development and interactive media, with a background in computer science and
              design.
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg p-6 text-white"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="font-bold mb-2">Approach</h3>
            <p>
              I combine technical expertise with creative exploration to build projects that push boundaries while
              solving real problems.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Experience Timeline */}
      <div className="mt-12 max-w-2xl mx-auto animate-on-scroll">
        <h3 className="text-xl font-bold mb-6 text-center">Experience Timeline</h3>

        <div className="relative border-l-2 border-purple-500 pl-8 ml-4 space-y-10">
          {experience.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <div className="absolute -left-12 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
              <div className="text-sm text-purple-500 font-bold mb-1">{item.year}</div>
              <div className="font-bold text-lg">{item.title}</div>
              <div className="text-gray-600 dark:text-gray-300 mb-1">{item.company}</div>
              <div className="text-gray-500 dark:text-gray-400">{item.description}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        className="mt-12 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => setSection("map")}
      >
        Back to Map
      </motion.button>
    </motion.div>
  )

  // Fix the 3D card effect in ProjectsSection to use a ref instead of directly modifying style
  // Replace the onMouseMove and onMouseLeave handlers in the project cards with this:
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const ProjectsSection = () => (
    <motion.div
      ref={containerRef}
      className="h-full w-full flex flex-col items-center justify-start p-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg transition-all hover:shadow-xl perspective-1000"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedProject(project)}
          >
            <div className="h-2 w-full" style={{ backgroundColor: project.color }}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full"
                    style={{
                      backgroundColor: `${project.color}30`,
                      color: project.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="mt-12 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => setSection("map")}
      >
        Back to Map
      </motion.button>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
              <img
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                className="h-full w-full object-cover rounded-lg"
              />
            </div>

            <p className="mb-4">{selectedProject.description}</p>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full"
                    style={{
                      backgroundColor: `${selectedProject.color}30`,
                      color: selectedProject.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg"
              >
                View Live
              </a>
              <a
                href={selectedProject.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                View Code
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )

  const SkillsSection = () => (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>

      <div className="max-w-2xl w-full mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 * index }}
          >
            <div className="flex justify-between mb-2">
              <span className="font-medium">{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <motion.div
                className="h-2.5 rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.2 * index }}
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="mt-12 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => setSection("map")}
      >
        Back to Map
      </motion.button>
    </motion.div>
  )

  const TestimonialsSection = () => (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center p-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={containerRef}
    >
      <h2 className="text-3xl font-bold mb-8">Client Testimonials</h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg animate-on-scroll"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
            <p className="italic text-gray-600 dark:text-gray-300">"{testimonial.quote}"</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="mt-12 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => setSection("map")}
      >
        Back to Map
      </motion.button>
    </motion.div>
  )

  const ContactSection = () => (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="max-w-md w-full mx-auto text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Interested in working together? Feel free to reach out using the form below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border ${
                errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              aria-label="Your Name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1 text-left">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border ${
                errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              aria-label="Your Email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 text-left">{errors.email}</p>}
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={4}
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border ${
                errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              aria-label="Your Message"
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1 text-left">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium"
          >
            Send Message
          </button>
        </form>

        <div className="flex justify-center space-x-6 mt-8">
          <a
            href="#"
            className="text-gray-500 hover:text-purple-500 transition-colors duration-300"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-purple-500 transition-colors duration-300"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-purple-500 transition-colors duration-300"
            aria-label="Twitter"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-purple-500 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </motion.div>

      <motion.button
        className="mt-12 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => setSection("map")}
      >
        Back to Map
      </motion.button>
    </motion.div>
  )

  return (
    <div className={`relative w-full h-screen bg-white text-gray-900 overflow-hidden ${isDarkMode ? "dark" : ""}`}>
      {/* Loading screen */}
      {isLoading ? (
        <motion.div
          className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, delay: 1 }}
          onAnimationComplete={() => setIsLoading(false)}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
          />
        </motion.div>
      ) : (
        <>
          {/* Particle background */}
          <ParticleBackground />

          {/* Custom cursor with optimized rendering */}
          {!isMobile && <CustomCursor cursorText={cursorText} />}

          {/* Main content */}
          <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden dark:bg-gray-900 dark:text-gray-100"
          >
            <AnimatePresence mode="wait">
              {activeSection === "intro" && <IntroSection key="intro" />}
              {activeSection === "map" && <MapSection key="map" />}
              {activeSection === "about" && <AboutSection key="about" />}
              {activeSection === "projects" && <ProjectsSection key="projects" />}
              {activeSection === "skills" && <SkillsSection key="skills" />}
              {activeSection === "testimonials" && <TestimonialsSection key="testimonials" />}
              {activeSection === "contact" && <ContactSection key="contact" />}
            </AnimatePresence>
          </div>

          {/* Mobile navigation for smaller screens - only visible on touch devices */}
          {isMobile && (
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 z-40">
              <div className="flex justify-around">
                {["map", "about", "projects", "skills", "testimonials", "contact"].map((section) => (
                  <button
                    key={section}
                    className={`p-2 rounded-full ${activeSection === section ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300" : ""}`}
                    onClick={() => setSection(section)}
                  >
                    <div className="capitalize text-xs">{section}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default InteractivePortfolio

