import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { projectService } from '../services/api'
import toast from 'react-hot-toast'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  const categories = ['all', 'web', 'mobile', 'ml', 'desktop', 'other']

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((p) => p.category === selectedCategory))
    }
  }, [selectedCategory, projects])

  const fetchProjects = async () => {
    try {
      const response = await projectService.getAll()
      setProjects(response.data)
      setFilteredProjects(response.data)
    } catch (error) {
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const openModal = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const closeModal = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProject?.images?.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
    }
  }

  const prevImage = () => {
    if (selectedProject?.images?.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)
    }
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
          <h1 className="text-5xl font-bold mb-4 text-gradient">My Projects</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Showcasing my work and skills
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-xl">
              No projects found in this category
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => openModal(project)}
              >
                <div className="relative h-48 bg-gradient-to-br from-primary-500 to-purple-600">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-4xl">
                      📁
                    </div>
                  )}
                  {project.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack?.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded text-sm ${
                        project.status === 'completed'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : project.status === 'in-progress'
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {project.status}
                    </span>
                    <button className="text-primary-500 hover:text-primary-600 font-semibold">
                      View Details →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeModal}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Carousel */}
            <div className="relative h-64 md:h-96 bg-gray-200 dark:bg-gray-700">
              {selectedProject.images?.length > 0 ? (
                <>
                  <img
                    src={selectedProject.images[currentImageIndex]}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                      >
                        <FiChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                      >
                        <FiChevronRight size={24} />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedProject.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full ${
                              idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : selectedProject.image ? (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  📁
                </div>
              )}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Project Details */}
            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {selectedProject.longDescription || selectedProject.description}
              </p>

              {/* Features */}
              {selectedProject.features?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              {selectedProject.techStack?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-4">
                {selectedProject.githubLink && (
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiGithub />
                    View Code
                  </a>
                )}
                {selectedProject.liveLink && (
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <FiExternalLink />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Projects
