import { motion } from 'framer-motion'
import { FiCode, FiCpu, FiServer, FiLayers, FiTerminal } from 'react-icons/fi'

const SkillsSection = () => {
    const techStack = [
        {
            category: 'Core Stack',
            icon: FiCode,
            color: 'text-cyan-500',
            skills: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JavaScript', 'TypeScript']
        },
        {
            category: 'AI & Data Science',
            icon: FiCpu,
            color: 'text-purple-500',
            skills: ['Python', 'Jupyter', 'TensorFlow', 'OpenCV', 'Machine Learning', 'Deep Learning']
        },
        {
            category: 'Tools & DevOps',
            icon: FiTerminal,
            color: 'text-green-500',
            skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Postman', 'Linux']
        },
        {
            category: 'Frontend & UI',
            icon: FiLayers,
            color: 'text-pink-500',
            skills: ['HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Design', 'Material UI', 'Framer Motion']
        }
    ]

    return (
        <section id="skills" className="section-padding">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-bold mb-4 block text-center lg:text-left">Technical Expertise</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-16 text-center lg:text-left">Tech Stack</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {techStack.map((stack, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card glass-card-hover p-8 md:p-10 rounded-[3rem] border-white/5"
                            >
                                <div className="flex items-center gap-6 mb-10">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 ${stack.color} text-3xl group-hover:scale-110 transition-transform duration-500 shadow-2xl`}>
                                        <stack.icon />
                                    </div>
                                    <h3 className="text-xl font-black uppercase tracking-widest text-neutral-900 dark:text-white leading-none">{stack.category}</h3>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    {stack.skills.map((skill, j) => (
                                        <span
                                            key={j}
                                            className="px-5 py-2.5 bg-gray-100 dark:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 border border-gray-200 dark:border-white/5 hover:border-cyan-500/50 hover:text-neutral-900 dark:hover:text-white transition-all cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Technologies in Focus */}
                <div className="mt-20">
                    <div className="p-1 glass-card rounded-full max-w-4xl mx-auto overflow-hidden">
                        <div className="flex flex-wrap items-center justify-center gap-2 p-2">
                            <span className="px-6 py-2 bg-cyan-500 text-black text-[10px] font-black rounded-full uppercase tracking-widest">In Focus ✨</span>
                            {['Docker', 'AWS / Vercel', 'REST APIs', 'GraphQL', 'System Design', 'PyTorch'].map((tech, i) => (
                                <span key={i} className="px-6 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-neutral-900 dark:hover:text-white transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SkillsSection
