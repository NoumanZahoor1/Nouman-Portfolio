import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiEye } from 'react-icons/fi'
import { blogService } from '../services/api'
import toast from 'react-hot-toast'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState('all')

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await blogService.getAll({ published: 'true' })
      setBlogs(response.data)
    } catch (error) {
      toast.error('Failed to load blog posts')
    } finally {
      setLoading(false)
    }
  }

  const allTags = ['all', ...new Set(blogs.flatMap((blog) => blog.tags || []))]

  const filteredBlogs =
    selectedTag === 'all'
      ? blogs
      : blogs.filter((blog) => blog.tags?.includes(selectedTag))

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

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-gradient">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Thoughts, tutorials, and insights
          </p>
        </motion.div>

        {/* Tag Filter */}
        {allTags.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  selectedTag === tag
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Blog Posts */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-xl mb-4">
              No blog posts found
            </p>
            <p className="text-gray-500 dark:text-gray-500">
              Check back soon for new content!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link to={`/blog/${blog.slug}`}>
                  <div className="relative h-48 bg-gradient-to-br from-primary-500 to-purple-600">
                    {blog.coverImage ? (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-4xl">
                        📝
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-semibold mb-3 line-clamp-2">{blog.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {blog.excerpt || blog.content.substring(0, 150) + '...'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <FiCalendar />
                          <span>{formatDate(blog.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiClock />
                          <span>{blog.readTime || 5} min read</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiEye />
                        <span>{blog.views || 0}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
