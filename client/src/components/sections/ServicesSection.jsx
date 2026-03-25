import { motion } from 'framer-motion'
import { FiCode, FiServer, FiCpu, FiLayout, FiActivity, FiZap } from 'react-icons/fi'

const ServicesSection = () => {
    const services = [
        {
            icon: FiCode,
            title: 'Full-Stack MERN Development',
            desc: 'Building scalable web applications using MongoDB, Express, React, and Node.js with clean architecture and production-ready code.',
            color: 'text-cyan-400'
        },
        {
            icon: FiCpu,
            title: 'AI & Machine Learning Solutions',
            desc: 'Developing intelligent systems using Python, Jupyter Notebook, and deep learning — including image caption generators, computer vision, and automation tools.',
            color: 'text-purple-400'
        },
        {
            icon: FiServer,
            title: 'Backend & Server Architecture',
            desc: 'Designing secure, high-performance APIs, authentication systems, and databases to power modern web applications.',
            color: 'text-green-400'
        },
        {
            icon: FiActivity,
            title: 'API Integration',
            desc: 'Integrating third-party services and building RESTful/GraphQL APIs for seamless communication between systems.',
            color: 'text-yellow-400'
        },
        {
            icon: FiLayout,
            title: 'Responsive & Modern UI',
            desc: 'Creating fast, mobile-first, and user-friendly interfaces with HTML, CSS, JavaScript, and React.',
            color: 'text-pink-400'
        },
        {
            icon: FiZap,
            title: 'Performance & Optimization',
            desc: 'Improving speed, scalability, and efficiency through code optimization, parallel processing, and smart system design.',
            color: 'text-orange-400'
        }
    ]

    return (
        <section id="services" className="section-padding">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-bold mb-4 block text-center lg:text-left">What I Do?</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-12 text-center lg:text-left">Here are some of my expertise</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group glass-card glass-card-hover p-10 rounded-[3rem] border-white/5 bg-white/1 overflow-hidden"
                            >
                                <div className={`text-4xl mb-8 ${service.color} group-hover:scale-110 transition-transform duration-500`}>
                                    <service.icon />
                                </div>
                                <h3 className="text-xl font-black mb-4 text-neutral-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors uppercase tracking-widest leading-tight">{service.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm font-medium">
                                    {service.desc}
                                </p>
                                <div className="mt-10 h-1 w-full bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '100%' }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                        className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default ServicesSection
