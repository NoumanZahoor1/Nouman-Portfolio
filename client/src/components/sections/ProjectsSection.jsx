import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiSearch, FiX } from 'react-icons/fi'
import ReactMarkdown from 'react-markdown'
import { projectService } from '../../services/api'
import toast from 'react-hot-toast'

const ProjectsSection = () => {
    const [projects, setProjects] = useState([])
    const [filter, setFilter] = useState('all')
    const [loading, setLoading] = useState(true)
    const [selectedProject, setSelectedProject] = useState(null)

    const staticProjects = [
        {
            _id: 'parallel-image-filter',
            title: 'Parallel Image Filter',
            category: 'AI',
            description: 'Parallel vs sequential image filtering using Python, OpenCV, and Streamlit.',
            longDescription: `
### Parallel Image Filtering using OpenCV + Streamlit

This project demonstrates parallel vs sequential image filtering using Python, OpenCV, and Streamlit. It benchmarks processing time, visualizes speedup, efficiency, and compares theoretical vs measured performance using:
- **Amdahl’s Law**
- **Gustafson’s Law**
- **SPMD + Shared Memory Model**

Perfect for Parallel & Distributed Computing (PDC) labs or understanding thread-level performance on CPUs.

✨ **Features**
- ✔️ Sequential vs Parallel image processing
- ✔️ Runs filters multiple times to simulate heavy computation
- ✔️ Adjustable threads (OpenCV multithreading)
- ✔️ Gaussian Blur, Average Blur, Sharpening & Edge Detection
- ✔️ **Real-time metrics:**
    - Execution time
    - Speedup
    - Efficiency
- ✔️ Amdahl vs Gustafson theoretical comparison plot
- ✔️ Interactive UI using Streamlit
`,
            githubLink: 'https://github.com/NoumanZahoor1/Parallel-Image-Filter-',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60'
        },
        {
            _id: 'image-caption-generator',
            title: 'Image Caption Generator',
            category: 'AI',
            description: 'A professional-grade Vision-to-Language application that generates descriptive captions for images.',
            longDescription: `
### Image Caption Generator using BLIP & Streamlit

A professional-grade Vision-to-Language application that generates meaningful, human-like textual descriptions for images. This project leverages the BLIP (Bootstrapping Language-Image Pre-training) architecture and is served via a modern, responsive Streamlit dashboard.

🌟 **Key Features**
- **Deep Learning Engine:** Uses the Salesforce BLIP-base model for state-of-the-art image understanding.
- **Professional Captions:** Implements Beam Search and Repetition Penalties to ensure descriptions are logical, grammatically correct, and free of word-looping errors.
- **Modern UI/UX:** A sleek, wide-layout dashboard built with Streamlit, featuring custom CSS, image previews, and sidebar navigation.
- **Interactive Settings:** Users can adjust "Precision" (Beam Search) and "Max Length" in real-time to fine-tune AI results.
- **One-Click Export:** Download generated captions directly as .txt files.

🚀 **Technical Stack**
- **Language:** Python
- **Framework:** Streamlit
- **Deep Learning:** PyTorch
- **Transformers:** Hugging Face (Salesforce/blip-image-captioning-base)
- **Image Processing:** Pillow (PIL)
`,
            githubLink: 'https://github.com/NoumanZahoor1/Image-Caption-Generator',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60'
        },
        {
            _id: 'netflix-clone',
            title: 'Netflix Pakistan Clone',
            category: 'Web',
            description: 'A pixel-perfect clone of the Netflix landing page built using pure HTML5 and CSS3.',
            longDescription: `
### Netflix-Pakistan-Clone

Netflix Clone – HTML & CSS. A responsive Netflix landing page clone built using pure HTML5 and CSS3, replicating the modern UI of Netflix. This project focuses on frontend design, layout structuring, and responsive web design principles without using JavaScript or any external frameworks.

🚀 **Features**
- 🔴 Netflix-style homepage layout
- 📱 Fully responsive design (mobile, tablet & desktop)
- 🎨 Modern UI using Flexbox & CSS Grid
- 🖼️ Hero banner with background image and overlay
- 📺 Movie/TV show sections with horizontal cards
- 🔤 Clean typography and consistent spacing
- ❌ No JavaScript – pure HTML & CSS

🛠️ **Technologies Used**
- **HTML5** – Page structure and semantic layout
- **CSS3** – Styling, animations, Flexbox & Grid
- **Google Fonts** – Clean and modern typography

📚 **Learning Outcomes**
- Understanding real-world website layouts
- Mastering Flexbox & CSS Grid
- Responsive design using media queries
- UI cloning from a professional platform
- Clean and organized CSS structure

⚠️ **Disclaimer**
This project is created for educational purposes only. Netflix is a registered trademark of Netflix, Inc. This clone is not affiliated with or endorsed by Netflix.

🌟 **Future Improvements**
- Add JavaScript for interactivity
- Implement login & signup pages
- Fetch real movie data using APIs
- Add hover animations & transitions
`,
            githubLink: 'https://github.com/NoumanZahoor1/Netflix-Pakistan-Clone',
            image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&auto=format&fit=crop&q=60'
        }
    ]

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await projectService.getAll()
                const fetchedIds = new Set(response.data.map(p => p._id))
                const uniqueStatic = staticProjects.filter(p => !fetchedIds.has(p._id))
                setProjects([...response.data, ...uniqueStatic])
            } catch (error) {
                setProjects(staticProjects)
            } finally {
                setLoading(false)
            }
        }
        fetchProjects()
    }, [])

    const categories = ['all', 'Web', 'AI']
    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter)

    return (
        <section id="work" className="section-padding">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-bold mb-4 block">Portfolio</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-12">Recent Work</h2>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-4 mb-16">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`
                  px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 border-white/5
                  ${filter === cat
                                        ? 'bg-cyan-500 text-black shadow-2xl shadow-cyan-500/40'
                                        : 'glass-card text-gray-500 hover:text-white hover:bg-white/5'}
                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-[400px] glass-card rounded-[2.5rem] animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode='popLayout'>
                                {filteredProjects.map((project, i) => (
                                    <motion.div
                                        key={project._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="group relative h-[500px] rounded-[3rem] overflow-hidden glass-card cursor-pointer border-white/5"
                                    >
                                        {/* Background Image */}
                                        <img
                                            src={project.image || "/assets/images/placeholder.jpg"}
                                            alt={project.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                                        />

                                        {/* Overlay Content */}
                                        <div
                                            onClick={() => setSelectedProject(project)}
                                            className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent p-10 flex flex-col justify-end transition-all duration-500 group-hover:from-neutral-950/90"
                                        >
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                                                    <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">
                                                        {project.category}
                                                    </span>
                                                </div>
                                                <h4 className="text-3xl font-black text-white mb-6 uppercase tracking-widest leading-none">
                                                    {project.title}
                                                </h4>

                                                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                                                        className="flex-grow py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:bg-cyan-500 transition-all"
                                                    >
                                                        Details
                                                    </button>
                                                    {project.githubLink && (
                                                        <a
                                                            href={project.githubLink}
                                                            target="_blank"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="w-14 h-14 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:text-cyan-500 transition-all"
                                                        >
                                                            <FiGithub size={20} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center px-4 py-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-neutral-950/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-6 md:p-12 z-10 custom-scrollbar border border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] backdrop-blur-xl"
                            style={{ background: 'rgba(255,255,255,0.01)' }}
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 glass-card rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors z-20"
                            >
                                <FiX size={20} />
                            </button>

                            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 mt-6">
                                <div className="space-y-6 md:space-y-8">
                                    <div className="w-full aspect-video lg:aspect-square rounded-[2rem] overflow-hidden shrink-0">
                                        <img
                                            src={selectedProject.image || "/assets/images/placeholder.jpg"}
                                            alt={selectedProject.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {selectedProject.githubLink && (
                                            <a
                                                href={selectedProject.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-grow h-14 md:h-16 bg-white text-black font-black uppercase text-[10px] md:text-xs tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 hover:bg-cyan-500 transition-colors"
                                            >
                                                <FiGithub size={20} /> GitHub Repository
                                            </a>
                                        )}
                                        {selectedProject.liveLink && (
                                            <a
                                                href={selectedProject.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full sm:w-16 h-14 sm:h-auto glass-card rounded-2xl flex items-center justify-center text-cyan-500 hover:bg-white/5 transition-colors"
                                            >
                                                <FiExternalLink size={24} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-6 md:space-y-8 max-w-none pb-8">
                                    <div>
                                        <span className="text-xs font-black text-cyan-500 uppercase tracking-[0.3em] mb-3 block">
                                            {selectedProject.category}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white leading-tight">
                                            {selectedProject.title}
                                        </h3>
                                    </div>

                                    <div className="prose prose-invert prose-cyan prose-sm max-w-none leading-relaxed selection:bg-cyan-500/30
                                        prose-headings:text-white prose-headings:font-black prose-headings:uppercase prose-headings:tracking-wide
                                        prose-p:text-gray-400 prose-li:text-gray-400 prose-strong:text-white
                                        prose-ul:space-y-1 prose-li:marker:text-cyan-500">
                                        <ReactMarkdown>
                                            {selectedProject.longDescription || selectedProject.description}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default ProjectsSection
