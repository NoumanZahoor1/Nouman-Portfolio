import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FiSun, FiMoon, FiGithub, FiLinkedin, FiMail, FiTwitter, FiMenu, FiX } from 'react-icons/fi'

const Sidebar = () => {
    const { darkMode, toggleDarkMode } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { to: 'home', label: 'Home' },
        { to: 'about', label: 'About' },
        { to: 'services', label: 'Services' },
        { to: 'skills', label: 'Skills' },
        { to: 'education', label: 'Education' },
        { to: 'experience', label: 'Experience' },
        { to: 'work', label: 'Work' },
        { to: 'certificates', label: 'Certificates' },
        { to: 'blog', label: 'Blog' },
        { to: 'contact', label: 'Contact' },
    ]

    const socialLinks = [
        { icon: FiGithub, url: 'https://github.com/NoumanZahoor1', label: 'GitHub' },
        { icon: FiLinkedin, url: 'https://www.linkedin.com/in/nouman-zahoor-jatoi-2b1815338/', label: 'LinkedIn' },
        { icon: FiTwitter, url: 'https://twitter.com', label: 'Twitter' },
        { icon: FiMail, url: 'mailto:noumanzahoor.cs@gmail.com', label: 'Email' },
    ]

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 right-4 z-[100] p-3 bg-white dark:bg-neutral-900 shadow-xl rounded-full text-neutral-900 dark:text-white"
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Sidebar Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[90] lg:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Main Sidebar */}
            <aside className={`
        sidebar-container lg:flex flex-col items-center justify-between py-1 px-1
        transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0 !flex' : '-translate-x-full lg:translate-x-0'}
        z-[95]
      `}>
                {/* Profile Info */}
                <div className="text-center w-full pt-4">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative inline-block mb-3"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-full blur-lg opacity-20 animate-pulse" />
                        <img
                            src="/assets/images/profile_new.jpg"
                            alt="Nouman"
                            className="profile-img-jackson relative z-10"
                            style={{ width: '6rem', height: '6rem' }}
                        />
                    </motion.div>

                    <h1 className="text-lg font-black mb-0">Nouman</h1>
                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-cyan-500 mb-2">
                        Full Stack Developer
                    </p>
                </div>

                {/* Navigation */}
                <nav className="flex-grow w-full py-2 sidebar-scroll-hide overflow-y-auto flex flex-col justify-center">
                    <ul className="space-y-0.5">
                        {navLinks.map((link) => (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    spy={true}
                                    smooth={true}
                                    offset={0}
                                    duration={500}
                                    activeClass="nav-link-active"
                                    className="block py-2 px-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-cyan-500 transition-all cursor-pointer rounded-lg"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom Actions & Social */}
                <div className="w-full space-y-3 pb-4 pt-2 border-t border-gray-100 dark:border-white/5">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="w-full flex items-center justify-center gap-2 py-2 glass-card rounded-xl hover:bg-neutral-50 dark:hover:bg-white/5 transition-all text-[10px] font-bold"
                    >
                        {darkMode ? (
                            <><FiSun className="text-yellow-400" /> Light Mode</>
                        ) : (
                            <><FiMoon className="text-cyan-500" /> Dark Mode</>
                        )}
                    </button>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-cyan-500 transition-colors"
                                aria-label={link.label}
                            >
                                <link.icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
