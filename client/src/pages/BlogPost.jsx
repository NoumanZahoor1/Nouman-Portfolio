import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { FiCalendar, FiClock, FiEye, FiArrowLeft } from 'react-icons/fi'
import { blogService } from '../services/api'
import toast from 'react-hot-toast'

const BlogPost = () => {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogPost()
  }, [slug])

  const fetchBlogPost = async () => {
    try {
      const response = await blogService.getBySlug(slug)
      setBlog(response.data)
    } catch (error) {
      toast.error('Failed to load blog post')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Blog post not found</h2>
          <Link to="/blog" className="text-primary-500 hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-3 text-cyan-500 font-black uppercase text-xs tracking-widest hover:gap-5 transition-all mb-12"
        >
          <FiArrowLeft />
          Back Home
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <FiCalendar />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock />
                <span>{blog.readTime || 5} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <FiEye />
                <span>{blog.views || 0} views</span>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          {blog.coverImage && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </motion.article>
      </div>
    </div>
  )
}

export default BlogPost
