import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi'
import { useEffect, useMemo } from 'react'
import Typewriter from '../components/Typewriter'

// Sections
import AboutSection from '../components/sections/AboutSection'
import ServicesSection from '../components/sections/ServicesSection'
import SkillsSection from '../components/sections/SkillsSection'
import EducationSection from '../components/sections/EducationSection'
import ExperienceSection from '../components/sections/ExperienceSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import BlogSection from '../components/sections/BlogSection'
import CertificateSection from '../components/sections/CertificateSection'
import ContactSection from '../components/sections/ContactSection'

const Home = () => {
  // Smooth spring physics for mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  // Optimized particle generation - Memoized
  const particles = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: 12 + Math.random() * 8,
    delay: i * 0.5
  })), [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX - window.innerWidth / 2) / 50)
      mouseY.set((e.clientY - window.innerHeight / 2) / 50)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="relative w-full overflow-hidden transition-colors duration-300">
      {/* Global Background Effects */}
      <div className="bg-mesh-static" />

      {/* Optimized Particle System */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [-30, 30, -30], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
            className="absolute bg-cyan-500 rounded-full gpu-accelerated"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`
            }}
          />
        ))}
      </div>

      {/* 1. Hero Section - Clean Portrait Design */}
      <section id="home" className="relative h-screen flex flex-col items-center overflow-hidden bg-white dark:bg-neutral-950">

        {/* Background Text - Two Lines with Premium Golden Gradient */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-[18vw] md:text-[12vw] font-black leading-[0.85] uppercase tracking-tight hero-text-premium"
          >
            Software
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="text-[18vw] md:text-[12vw] font-black leading-[0.85] uppercase tracking-tight hero-text-premium mt-2 md:mt-0"
          >
            Engineer
          </motion.h1>
        </div>

        {/* The Centered Portrait */}
        <div className="relative z-30 w-full h-[65vh] mt-[15vh] md:mt-0 md:h-full md:max-w-4xl md:px-4 md:flex md:justify-center md:items-end md:pb-[5vh]">
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.4, ease: "circOut" }}
            className="relative w-full h-full md:w-auto md:h-auto portrait-mask md:scale-125 md:origin-bottom flex justify-center items-center md:items-end"
          >
            <img
              src="/assets/images/profile_new.jpg"
              alt="Nouman"
              className="w-full h-full object-cover object-top md:h-[85vh] md:w-auto md:object-contain grayscale hover:grayscale-0 transition-all duration-1000 contrast-110 brightness-75 hover:brightness-100"
            />
          </motion.div>
          {/* Gradient fade at bottom — mobile only */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent pointer-events-none md:hidden z-10" />
        </div>

        {/* Layer 5: Bottom Accents */}
        <div className="absolute bottom-6 left-0 right-0 px-6 md:bottom-12 md:left-12 md:right-12 flex flex-col md:flex-row justify-center md:justify-between items-center md:items-end gap-6 md:gap-0 z-30">
          {/* Specialization Text */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="hero-specialization text-center md:text-left"
          >
            Specialized in full-stack web development, <br />
            MERN stack, and high-performance <br />
            AI integrated applications.
          </motion.div>

          {/* Let's Chat Button */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <ScrollLink to="contact" smooth={true} duration={500} className="pill-button group items-center cursor-pointer shadow-xl">
              <span>Let's chat</span>
              <div className="pill-icon group-hover:rotate-45 transition-transform duration-500">
                <FiArrowRight size={20} />
              </div>
            </ScrollLink>
          </motion.div>
        </div>

        {/* Dynamic Background Noise/Mesh (Subtle) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
        </div>
      </section>

      {/* 2. About Section */}
      <AboutSection />

      {/* 3. Services Section */}
      <ServicesSection />

      {/* 4. Skills Section */}
      <SkillsSection />

      {/* 5. Education Section */}
      <EducationSection />

      {/* 6. Experience Section */}
      <ExperienceSection />

      {/* 7. Projects Section */}
      <ProjectsSection />

      {/* 8. Certificate Section */}
      <CertificateSection />

      {/* 9. Blog Section */}
      <BlogSection />

      {/* 9. Contact Section */}
      <ContactSection />

    </div>
  )
}

export default Home
