import { useLocation, Link as RouterLink } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const FooterNav = ({ item, label }) => {
    const sectionId = item.toLowerCase()
    const content = (
      <>
        <span className="w-0 group-hover:w-4 h-[1px] bg-cyan-500 transition-all duration-300" />
        {label || item}
      </>
    )
    const className = "text-sm font-bold text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center gap-2 group"

    if (isHomePage) {
      return (
        <ScrollLink
          to={sectionId}
          smooth={true}
          duration={500}
          className={className}
        >
          {content}
        </ScrollLink>
      )
    }

    return (
      <RouterLink to={`/#${sectionId}`} className={className}>
        {content}
      </RouterLink>
    )
  }

  return (
    <footer className="relative pt-32 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-300">
      {/* Background Text Overlay - Matches Hero Style */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0 select-none pb-4">
        <h2 className="text-[15vw] font-black leading-none uppercase tracking-tighter text-neutral-900 dark:text-white whitespace-nowrap">
          NOUMAN
        </h2>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-24 mb-20">
          {/* Branding Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                N
              </div>
              <h3 className="text-2xl font-black uppercase tracking-widest text-neutral-900 dark:text-white">
                Nouman <span className="text-cyan-500">Zahoor</span>
              </h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm leading-relaxed mb-10 font-medium">
              Designing and building high-performance digital experiences with a focus on MERN stack and AI innovation.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: FiGithub, href: 'https://github.com/NoumanZahoor1' },
                { icon: FiLinkedin, href: 'https://www.linkedin.com/in/nouman-zahoor-jatoi-2b1815338/' },
                { icon: FiMail, href: 'mailto:nomijatoi456@gmail.com' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-gray-500 hover:text-cyan-500 hover:scale-110 transition-all duration-500 border-white/5"
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links Column */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-8 underline decoration-cyan-500/20 underline-offset-8">Navigation</h4>
            <ul className="space-y-4">
              {['About', 'Services', 'Skills', 'Education', 'Experience', 'Projects', 'Certificates', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <FooterNav item={item === 'Projects' ? 'work' : item} label={item} />
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact Column */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-8 underline decoration-cyan-500/20 underline-offset-8">Contact Info</h4>
            <ul className="space-y-6">
              <li>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 mb-1">Email</p>
                <a href="mailto:nomijatoi456@gmail.com" className="text-sm font-bold text-gray-400 hover:text-cyan-500 transition-colors">nomijatoi456@gmail.com</a>
              </li>
              <li>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 mb-1">Phone</p>
                <p className="text-sm font-bold text-gray-400">+92 317 7543733</p>
              </li>
              <li>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 mb-1">Location</p>
                <p className="text-sm font-bold text-gray-400">Okara, Punjab, Pakistan</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">
            © {currentYear} Nouman Zahoor · All Rights Reserved
          </p>
          <div className="flex gap-8">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 hover:text-white transition-colors"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
