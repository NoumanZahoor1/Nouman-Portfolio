import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCalendar, FiClock, FiArrowRight, FiX } from 'react-icons/fi'
import ReactMarkdown from 'react-markdown'
import { blogService } from '../../services/api'
import toast from 'react-hot-toast'

const BlogSection = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedBlog, setSelectedBlog] = useState(null)

    const staticBlogs = [
        {
            _id: 'blog-1',
            title: 'Mastering the MERN Stack in 2024',
            coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
            category: 'Web Dev',
            createdAt: new Date().toISOString(),
            readTime: 8,
            content: `
### Mastering the MERN Stack in 2024

The MERN stack (MongoDB, Express, React, Node.js) remains the most popular choice for modern full-stack developers. This year, we're seeing a shift towards better performance and cleaner architecture.

#### Why MERN?
- **All-JavaScript:** One language from frontend to backend.
- **Vibrant Ecosystem:** Thousands of libraries to speed up development.
- **Scalability:** Built-in support for distributed systems.

#### Key Tips for Success:
1. **Optimize Your Queries:** Use proper indexing in MongoDB.
2. **Modular Backend:** Organize your Express routes and controllers.
3. **State Management:** Use Context API or Redux wisely.
`
        },
        {
            _id: 'blog-2',
            title: 'The Future of AI in Web Development',
            coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
            category: 'AI',
            createdAt: new Date().toISOString(),
            readTime: 6,
            content: `
### The Future of AI in Web Development

AI is no longer just a buzzword; it's a core component of modern web applications. From chatbots to visual search, the possibilities are endless.

#### Integration Strategies:
- **Local Models:** Using Transformers.js for on-device processing.
- **API Services:** Leveraging OpenAI or Anthropic for complex logic.
- **Vector Databases:** Managing embeddings for semantic search.

#### What to Watch:
- Generative UI components.
- Real-time image processing in the browser.
- AI-driven performance optimization.
`
        },
        {
            _id: 'blog-3',
            title: 'Building Scalable APIs with Node.js',
            coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
            category: 'Backend',
            createdAt: new Date().toISOString(),
            readTime: 10,
            content: `
### Building Scalable APIs with Node.js

Node.js is built for high-concurrency environments. Learn how to architect your APIs to handle millions of requests without breaking a sweat.

#### Essential Practices:
- **Middleware Architecture:** Proper error handling and logging.
- **Authentication:** Implementing secure JWT flows.
- **Rate Limiting:** Protecting your resources from abuse.

#### Scaling Logic:
- Horizontal scaling with **Docker** and **Kubernetes**.
- Caching strategies using **Redis**.
- Efficient database pooling and clustering.
`
        }
    ]

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogService.getAll({ published: 'true' })
                if (response.data.length > 0) {
                    setBlogs(response.data.slice(0, 3))
                } else {
                    setBlogs(staticBlogs)
                }
            } catch (error) {
                setBlogs(staticBlogs)
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])

    return (
        <section id="blog" className="section-padding">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-bold mb-4 block">Journal</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-16">Latest Blog Posts</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {blogs.map((blog, i) => (
                            <motion.article
                                key={blog._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setSelectedBlog(blog)}
                                className="group glass-card glass-card-hover rounded-[3rem] overflow-hidden cursor-pointer border-white/5"
                            >
                                <div className="h-64 relative overflow-hidden">
                                    <img
                                        src={blog.coverImage || "/assets/images/blog-placeholder.jpg"}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                        alt={blog.title}
                                    />
                                    <div className="absolute top-8 left-8 px-6 py-2 bg-black/60 backdrop-blur-xl rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 border border-white/10">
                                        {blog.category || 'Tech'}
                                    </div>
                                </div>

                                <div className="p-10">
                                    <div className="flex gap-6 text-[10px] items-center mb-8 text-gray-500 font-black uppercase tracking-[0.2em]">
                                        <span className="flex items-center gap-2"><FiCalendar className="text-cyan-500" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-2"><FiClock className="text-cyan-500" /> {blog.readTime || 5} MIN</span>
                                    </div>

                                    <h4 className="text-2xl font-black mb-6 text-neutral-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors uppercase tracking-widest leading-tight">
                                        {blog.title}
                                    </h4>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedBlog(blog); }}
                                        className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 group-hover:text-cyan-600 dark:group-hover:text-white transition-all"
                                    >
                                        READ ARTICLE <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                </motion.div>
            </div>

            {/* Blog Content Modal */}
            <AnimatePresence>
                {selectedBlog && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center px-4 py-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedBlog(null)}
                            className="absolute inset-0 bg-neutral-950/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-card rounded-[3rem] p-6 md:p-12 z-10 custom-scrollbar"
                        >
                            <button
                                onClick={() => setSelectedBlog(null)}
                                className="absolute top-8 right-8 w-12 h-12 glass-card rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                            >
                                <FiX size={24} />
                            </button>

                            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 mt-6">
                                <div className="w-full aspect-video lg:aspect-square rounded-[2rem] overflow-hidden shrink-0">
                                    <img
                                        src={selectedBlog.coverImage || "/assets/images/blog-placeholder.jpg"}
                                        alt={selectedBlog.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="space-y-6 md:space-y-8 prose prose-invert prose-cyan max-w-none pb-8">
                                    <div>
                                        <span className="text-xs font-black text-cyan-500 uppercase tracking-[0.3em] mb-3 block">
                                            {selectedBlog.category}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white leading-tight">
                                            {selectedBlog.title}
                                        </h3>
                                        <div className="flex gap-4 mt-4 text-[10px] items-center text-gray-500 font-black uppercase tracking-widest">
                                            <span className="flex items-center gap-2"><FiCalendar className="text-cyan-500" /> {new Date(selectedBlog.createdAt).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-2"><FiClock className="text-cyan-500" /> {selectedBlog.readTime || 5} Min Read</span>
                                        </div>
                                    </div>

                                    <div className="text-gray-400 leading-relaxed text-xs md:text-sm selection:bg-cyan-500/30">
                                        <ReactMarkdown>
                                            {selectedBlog.content || "Full article coming soon..."}
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

export default BlogSection
