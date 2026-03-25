import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiAward, FiExternalLink, FiCalendar, FiUser, FiMaximize2, FiX } from 'react-icons/fi'
import { certificateService } from '../../services/api'
import toast from 'react-hot-toast'

// ✅ Hardcoded fallback — always shown even if MongoDB is down
const FALLBACK_CERTIFICATES = [
    {
        _id: 'fallback-1',
        title: 'Full-Stack Web Development',
        issuer: 'WebDevelopmentCourse.IN',
        category: 'Web Development',
        issueDate: '2023-01-01',
        image: '/certificates/WebDevelopmentCourse.IN .png',
    },
    {
        _id: 'fallback-2',
        title: 'MERN Stack Development',
        issuer: 'Coursera',
        category: 'Web Development',
        issueDate: '2023-06-01',
        image: '/certificates/mern-stack.png',
    },
    {
        _id: 'fallback-3',
        title: 'Full-Stack Development',
        issuer: 'Coursera',
        category: 'Web Development',
        issueDate: '2023-08-01',
        image: '/certificates/full-stack.png',
    },
    {
        _id: 'fallback-4',
        title: 'AI Fundamentals',
        issuer: 'DataCamp',
        category: 'AI & ML',
        issueDate: '2024-01-01',
        image: '/certificates/AI Fundamentals.png',
    },
    {
        _id: 'fallback-5',
        title: 'Understanding Artificial Intelligence',
        issuer: 'DataCamp',
        category: 'AI & ML',
        issueDate: '2024-01-01',
        image: '/certificates/Understanding Artifical Intelligence .png',
    },
    {
        _id: 'fallback-6',
        title: 'Understanding Machine Learning',
        issuer: 'DataCamp',
        category: 'AI & ML',
        issueDate: '2024-02-01',
        image: '/certificates/Understanding Machine Learning.png',
    },
    {
        _id: 'fallback-7',
        title: 'Understanding Data Science',
        issuer: 'DataCamp',
        category: 'AI & ML',
        issueDate: '2024-02-01',
        image: '/certificates/Understanding Data Science.png',
    },
    {
        _id: 'fallback-8',
        title: 'Generative AI Concepts',
        issuer: 'DataCamp',
        category: 'AI & ML',
        issueDate: '2024-03-01',
        image: '/certificates/Generative AI Concepts .png',
    },
    {
        _id: 'fallback-9',
        title: 'LLMs Concepts',
        issuer: 'DataCamp',
        category: 'AI & ML',
        issueDate: '2024-03-01',
        image: '/certificates/LLMs Concept.png',
    },
    {
        _id: 'fallback-10',
        title: 'Introduction to ChatGPT',
        issuer: 'DataCamp',
        category: 'AI & ML',
        issueDate: '2024-04-01',
        image: '/certificates/Introduction to ChatGPT.png',
    },
    {
        _id: 'fallback-11',
        title: 'Introduction to SQL',
        issuer: 'DataCamp',
        category: 'Database',
        issueDate: '2024-05-01',
        image: '/certificates/Introduction to SQL.png',
    },
]

const CertificateSection = () => {
    const [certificates, setCertificates] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(null)
    const [activeTab, setActiveTab] = useState('All')

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await certificateService.getAll()
                // Use DB data if available, otherwise fall back to hardcoded
                setCertificates(response.data?.length ? response.data : FALLBACK_CERTIFICATES)
            } catch (error) {
                console.error('Failed to fetch certificates:', error)
                // MongoDB down — show hardcoded fallback
                setCertificates(FALLBACK_CERTIFICATES)
            } finally {
                setLoading(false)
            }
        }
        fetchCertificates()
    }, [])

    const categories = useMemo(() => {
        if (!certificates.length) return ['All']
        const uniqueCategories = new Set(certificates.map(c => c.category || 'Other'))
        return ['All', ...Array.from(uniqueCategories)]
    }, [certificates])

    const filteredCertificates = useMemo(() => {
        if (activeTab === 'All') return certificates
        return certificates.filter(c => (c.category || 'Other') === activeTab)
    }, [certificates, activeTab])

    const isEmpty = !loading && certificates.length === 0

    return (
        <section id="certificates" className="section-padding bg-gray-50/50 dark:bg-neutral-900/20">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-bold mb-4 block underline decoration-cyan-500/30 decoration-4 underline-offset-8">Achievements</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6">Certifications</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto uppercase tracking-widest text-[10px] font-bold">
                        Professional milestones and continuous learning journey in software engineering and AI.
                    </p>
                </motion.div>

                {!loading && categories.length > 1 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                                    activeTab === category
                                        ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>
                )}

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[300px] glass-card rounded-3xl animate-pulse" />
                        ))}
                    </div>
                ) : isEmpty ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-24 h-24 rounded-3xl glass-card flex items-center justify-center text-cyan-500/40 mb-8">
                            <FiAward size={48} />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-widest text-neutral-900 dark:text-white mb-3">No Certificates Yet</h3>
                        <p className="text-sm text-gray-500 font-medium max-w-xs">Certificates will appear here once added from the admin dashboard.</p>
                    </div>
                ) : (
                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredCertificates.map((cert, i) => (
                                <motion.div
                                    layout
                                    key={cert._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative glass-card rounded-[2.5rem] p-6 hover:bg-white dark:hover:bg-white/5 transition-all duration-500 border-white/5 overflow-hidden"
                                >
                                {/* Preview Image / Icon Header */}
                                <div className="relative mb-6 rounded-2xl overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-neutral-800">
                                    {cert.image ? (
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-cyan-500/30">
                                            <FiAward size={64} />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <button
                                            onClick={() => setSelectedImage(cert.image || cert.certificateLink)}
                                            className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 hover:text-black transition-all duration-300"
                                            title="Full View"
                                        >
                                            <FiMaximize2 size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="relative z-10">
                                    <h4 className="text-xl font-black mb-3 uppercase tracking-wider group-hover:text-cyan-500 transition-colors">
                                        {cert.title}
                                    </h4>

                                    <div className="space-y-2 mb-8 text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <FiUser className="text-cyan-500/50" />
                                            <span>Issued by {cert.issuer}</span>
                                        </div>
                                        {cert.issueDate && (
                                            <div className="flex items-center gap-2">
                                                <FiCalendar className="text-cyan-500/50" />
                                                <span>{new Date(cert.issueDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-4">
                                        {cert.image && (
                                            <button
                                                onClick={() => setSelectedImage(cert.image)}
                                                className="w-full px-4 py-3 border border-neutral-200 dark:border-white/10 rounded-xl hover:border-cyan-500 transition-colors text-[10px] font-black uppercase tracking-widest"
                                            >
                                                Full View
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Lightbox */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-8 right-8 text-white hover:text-cyan-500 transition-colors p-2"
                            >
                                <FiX size={32} />
                            </button>
                            <motion.img
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                src={selectedImage}
                                alt="Certificate Full View"
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

export default CertificateSection
