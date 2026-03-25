import { motion } from 'framer-motion'
import { FiBriefcase, FiGithub } from 'react-icons/fi'

const ExperienceSection = () => {
    const experiences = [
        {
            role: '🚀 Full-Stack MERN Development',
            period: '2023 – Present',
            desc: 'Designed and built multiple full-stack web applications using MongoDB, Express, React, and Node.js. Implemented authentication systems, REST APIs, database architecture, and responsive user interfaces focused on performance and scalability.',
            link: 'https://github.com/NoumanZahoor1/Netflix-Pakistan-Clone',
            color: 'bg-cyan-500'
        },
        {
            role: '🤖 AI & Machine Learning Projects',
            period: '2023 – Present',
            desc: 'Developed intelligent systems using Python and Jupyter Notebook, including image caption generators, computer vision models, and parallel image processing solutions. Focused on optimizing speed, accuracy, and real-world usability.',
            link: 'https://github.com/NoumanZahoor1/Image-Caption-Generator',
            color: 'bg-purple-500'
        },
        {
            role: '📚 Continuous Learning & Practical Experience',
            period: 'Ongoing',
            desc: 'Constantly improving skills through certifications, hands-on projects, and modern tools such as Docker, Git, cloud deployment, and system design. Passionate about writing clean code and building production-ready applications.',
            color: 'bg-pink-500'
        }
    ]

    return (
        <section id="experience" className="section-padding">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-bold mb-4 block">Development Experience</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-16">My Journey</h2>

                    <div className="relative space-y-16">
                        {/* Timeline Line */}
                        <div className="absolute left-[30px] top-6 bottom-6 w-[1px] bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-pink-500/50" />

                        {experiences.map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative pl-24 group"
                            >
                                {/* Timeline Dot */}
                                <div className={`
                    absolute left-0 top-0 w-16 h-16 rounded-[1.5rem] flex items-center justify-center z-10 
                    transition-all duration-700 group-hover:rotate-[360deg] shadow-2xl
                    ${exp.color} text-black font-black
                `}>
                                    <FiBriefcase size={24} />
                                </div>

                                {/* Content Card */}
                                <div className="glass-card glass-card-hover p-10 rounded-[3rem] border-white/5">
                                    <div className="flex flex-wrap justify-between items-center gap-6 mb-8">
                                        <div className="space-y-2">
                                            <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white leading-tight">{exp.role}</h4>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full premium-gradient animate-pulse" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">
                                                    {exp.period}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl font-medium">
                                        {exp.desc}
                                    </p>

                                    {exp.link && (
                                        <a
                                            href={exp.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-4 mt-10 px-8 py-3 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5 text-[10px] font-black uppercase tracking-widest text-neutral-900 dark:text-white hover:bg-cyan-500 hover:text-black transition-all"
                                        >
                                            <FiGithub size={16} />
                                            <span>Breakdown</span>
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default ExperienceSection
