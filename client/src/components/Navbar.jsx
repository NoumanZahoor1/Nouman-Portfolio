import { useState, useEffect } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiBriefcase, FiBookOpen } from 'react-icons/fi'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { darkMode, toggleDarkMode } = useTheme()
    const { user } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isHomePage = location.pathname === '/'

    const navLinks = [
        { to: 'home', label: 'Home' },
        { to: 'about', label: 'About' },
        { to: 'services', label: 'Services' },
        { to: 'skills', label: 'Skills' },
        { to: 'education', label: 'Education' },
        { to: 'experience', label: 'Experience' },
        { to: 'work', label: 'Projects' },
        { to: 'certificates', label: 'Certifs' },
        { to: 'blog', label: 'Blog' },
        { to: 'contact', label: 'Contact' },
    ]

    const handleNavClick = (to) => {
        if (!isHomePage) {
            navigate(`/#${to}`)
        }
        setIsOpen(false)
    }

    const NavLink = ({ link, mobile = false }) => {
        const baseClass = mobile
            ? `block py-4 px-8 text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-3 ${location.hash === `#${link.to}` ? 'bg-cyan-500 text-black' : 'text-gray-500 hover:text-cyan-500'}`
            : `relative text-[8px] lg:text-[7.5px] xl:text-[9px] font-black uppercase tracking-widest xl:tracking-[0.2em] transition-colors cursor-pointer flex items-center gap-1.5 ${location.hash === `#${link.to}` ? 'text-cyan-500' : 'text-gray-500 hover:text-cyan-500'}`

        const content = <span>{link.label}</span>

        if (isHomePage) {
            return (
                <ScrollLink
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={800}
                    activeClass="!text-cyan-500"
                    className={baseClass}
                    onClick={() => setIsOpen(false)}
                >
                    {content}
                    {!mobile && (
                        <motion.div
                            className="absolute -bottom-1 left-0 right-0 h-[1px] bg-cyan-500 scale-x-0 origin-left"
                            whileHover={{ scaleX: 1 }}
                        />
                    )}
                </ScrollLink>
            )
        }

        return (
            <RouterLink to={`/#${link.to}`} className={baseClass} onClick={() => setIsOpen(false)}>
                {content}
            </RouterLink>
        )
    }

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'py-4 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl shadow-2xl border-b border-white/5'
                : 'py-8 bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
        >
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex items-center justify-between">
                    <RouterLink to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-black font-black text-lg transition-transform group-hover:rotate-12">
                            N
                        </div>
                        <span className="text-xl font-black uppercase tracking-widest text-neutral-900 dark:text-white hidden sm:block">
                            Nouman <span className="text-cyan-500">Zahoor</span>
                        </span>
                    </RouterLink>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
                        {navLinks.map((link) => (
                            <NavLink key={link.to} link={link} />
                        ))}

                        <div className="h-4 w-px bg-white/10 mx-1 xl:mx-2" />

                        {user && (
                            <RouterLink
                                to="/admin"
                                className="px-3 xl:px-5 py-1.5 xl:py-2 bg-white/5 border border-white/10 rounded-lg xl:rounded-xl text-[8px] xl:text-[9px] font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all whitespace-nowrap"
                            >
                                Admin
                            </RouterLink>
                        )}

                        <button
                            onClick={toggleDarkMode}
                            className="p-2 xl:p-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-500 hover:text-cyan-500 transition-all shrink-0"
                            aria-label="Toggle theme"
                        >
                            {darkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center gap-3">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-500"
                        >
                            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2.5 rounded-xl bg-neutral-900 text-cyan-500 shadow-xl"
                        >
                            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="lg:hidden fixed inset-0 top-[88px] bg-white dark:bg-neutral-950 z-40 overflow-y-auto"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                        >
                            <div className="flex flex-col py-8">
                                {navLinks.map((link) => (
                                    <NavLink key={link.to} link={link} mobile={true} />
                                ))}

                                {user && (
                                    <RouterLink
                                        to="/admin"
                                        onClick={() => setIsOpen(false)}
                                        className="mx-8 mt-4 py-4 bg-cyan-500 text-black text-center font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl"
                                    >
                                        Admin Dashboard
                                    </RouterLink>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}

export default Navbar
