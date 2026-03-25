import { motion } from 'framer-motion'
import { FiDownload, FiCode, FiDatabase, FiServer, FiCloud } from 'react-icons/fi'
import { Link as ScrollLink } from 'react-scroll'

const AboutSection = () => {
    const skills = [
        { name: 'React', level: 90, icon: '⚛️' },
        { name: 'Node.js', level: 85, icon: '🟢' },
        { name: 'MongoDB', level: 80, icon: '🍃' },
        { name: 'Express', level: 85, icon: '🚀' },
        { name: 'JavaScript', level: 90, icon: '📜' },
        { name: 'TypeScript', level: 75, icon: '📘' },
        { name: 'TailwindCSS', level: 88, icon: '🎨' },
        { name: 'Git', level: 85, icon: '🔀' },
    ]

    const categories = [
        { icon: FiCode, title: 'Frontend', skills: ['React', 'Next.js', 'Tailwind', 'HTML/CSS'] },
        { icon: FiServer, title: 'Backend', skills: ['Node.js', 'Express', 'Python', 'REST APIs'] },
        { icon: FiDatabase, title: 'Database', skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'] },
        { icon: FiCloud, title: 'DevOps', skills: ['AWS', 'Docker', 'CI/CD', 'Git'] },
    ]

    return (
        <section id="about" className="section-padding min-h-screen flex items-center">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-bold mb-4 block">About Me</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-12">The Developer<br />Behind the Code</h2>

                    <div className="grid lg:grid-cols-5 gap-12 items-start">
                        <div className="lg:col-span-3 space-y-6">
                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                                I’m a <span className="text-neutral-900 dark:text-white font-bold underline decoration-cyan-500/30">full-stack developer</span> who builds smart, scalable, and impactful software.
                            </p>
                            <p className="text-lg text-gray-500 dark:text-gray-500 leading-relaxed">
                                With expertise in <span className="text-neutral-900 dark:text-white font-bold">MERN stack and Artificial Intelligence</span>, I create modern web applications and AI-driven solutions that solve real-world problems. From dynamic websites to machine learning projects, I focus on performance, clean architecture, and great user experiences.
                            </p>
                            <p className="text-lg text-gray-500 dark:text-gray-500 leading-relaxed">
                                Currently completing my <span className="text-neutral-900 dark:text-white font-bold">BSCS at COMSATS University</span>, I’m constantly learning and pushing my limits to engineer better digital products every day.
                            </p>

                            <div className="pt-6 flex flex-wrap gap-4">
                                <a
                                    href="/nouman-zahoor-cv.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-8 py-4 bg-cyan-500 text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:scale-105 hover:bg-cyan-400 active:scale-95 transition-all shadow-lg shadow-cyan-500/30"
                                >
                                    <FiDownload size={16} />
                                    Download CV
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                            {categories.map((cat, i) => (
                                <div key={i} className="glass-card glass-card-hover p-6 rounded-3xl border-white/5">
                                    <cat.icon className="text-3xl text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
                                    <h4 className="font-black text-xs uppercase tracking-widest mb-2 text-neutral-900 dark:text-white">{cat.title}</h4>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{cat.skills.slice(0, 2).join(' • ')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Highlight Quote */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative p-6 md:p-10 rounded-[2.5rem] overflow-hidden premium-gradient group"
                >
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-xl md:text-3xl font-black text-black leading-tight text-center relative z-10 uppercase tracking-tighter">
                        "Delivering high-performance <br className="hidden md:block" /> digital experiences."
                    </h3>
                    <div className="mt-12 flex justify-center relative z-10">
                        <ScrollLink
                            to="contact"
                            smooth={true}
                            duration={500}
                            className="px-12 py-5 bg-black text-white font-black uppercase text-xs tracking-[0.4em] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl cursor-pointer"
                        >
                            Hire me now
                        </ScrollLink>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default AboutSection
