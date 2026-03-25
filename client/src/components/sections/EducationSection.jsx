import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiChevronDown, FiBookOpen } from 'react-icons/fi'

const EducationSection = () => {
    const [activeTab, setActiveTab] = useState(0)

    const items = [
        {
            title: '🎓 Bachelor of Science in Computer Science (BSCS)',
            desc: 'COMSATS University Islamabad, Sahiwal Campus. Focused on Software Engineering, Data Structures & Algorithms, Database Systems, Web Development, and Artificial Intelligence. Built multiple full-stack MERN applications and AI-based projects including image caption generation and parallel image processing systems.',
            year: '2022 – Present'
        },
        {
            title: '🎓 Intermediate (ICS)',
            desc: 'Aspire College, Okara. Developed strong foundations in mathematics, logic building, and analytical problem solving that shaped my interest in computer science.',
            year: '2020 – 2022'
        },
        {
            title: '🎓 Matriculation (Science)',
            desc: 'District Public School (DPS), Okara. Completed secondary education with a focus on science and technology subjects.',
            year: '2018 – 2020'
        }
    ]

    return (
        <section id="education" className="section-padding flex items-center">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-bold mb-4 block">Education</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-12">Education</h2>

                    <div className="max-w-4xl space-y-6">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className={`
                  glass-card transition-all duration-500 rounded-[2.5rem] overflow-hidden border-white/5
                  ${activeTab === i ? 'ring-1 ring-cyan-500/50 shadow-2xl shadow-cyan-500/10' : 'hover:bg-white/5'}
                `}
                            >
                                <button
                                    onClick={() => setActiveTab(activeTab === i ? -1 : i)}
                                    className="w-full flex items-center justify-between p-8 md:p-10 text-left"
                                >
                                    <div className="flex items-center gap-8">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${activeTab === i ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/40' : 'bg-gray-100 dark:bg-white/5 text-cyan-500'}`}>
                                            <FiBookOpen size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-xl md:text-2xl uppercase tracking-widest text-neutral-900 dark:text-white leading-tight">{item.title}</h4>
                                            <div className="flex items-center gap-3 mt-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{item.year}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center transition-all duration-500 ${activeTab === i ? 'rotate-180 bg-cyan-500 border-cyan-500 text-black' : 'text-gray-500'}`}>
                                        <FiChevronDown size={20} />
                                    </div>
                                </button>

                                <motion.div
                                    initial={false}
                                    animate={{ height: activeTab === i ? 'auto' : 0, opacity: activeTab === i ? 1 : 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-8 pb-8 pt-0 pl-24 text-gray-500 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                                        {item.desc}
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default EducationSection
