import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { projectService, blogService, messageService, certificateService, uploadService } from '../services/api'
import toast from 'react-hot-toast'
import {
    FiFolder,
    FiFileText,
    FiLogOut,
    FiAward,
    FiMail,
    FiUpload,
} from 'react-icons/fi'

import DashboardStats from '../components/admin/DashboardStats'
import ProjectManager from '../components/admin/ProjectManager'
import BlogManager from '../components/admin/BlogManager'
import CertificateManager from '../components/admin/CertificateManager'
import MessageManager from '../components/admin/MessageManager'

const Admin = () => {
    const { user, logout } = useAuth()
    const [activeTab, setActiveTab] = useState('projects')
    const [projects, setProjects] = useState([])
    const [blogs, setBlogs] = useState([])
    const [messages, setMessages] = useState([])
    const [certificates, setCertificates] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState(null)
    const [editingItem, setEditingItem] = useState(null)
    const [formData, setFormData] = useState({})
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [activeTab])

    useEffect(() => {
        if (editingItem) {
            setFormData(editingItem)
        } else {
            setFormData({})
        }
    }, [editingItem, showModal])

    const handleFileUpload = async (e, field) => {
        const file = e.target.files[0]
        if (!file) return

        try {
            setIsUploading(true)
            const response = await uploadService(file)
            setFormData({ ...formData, [field]: response.data.url })
            toast.success('File uploaded successfully')
        } catch (error) {
            const message = error.response?.data?.message || 'Upload failed'
            toast.error(message)
        } finally {
            setIsUploading(false)
        }
    }

    const handleTogglePublish = async (id, currentStatus) => {
        try {
            await blogService.update(id, { published: !currentStatus })
            toast.success(`Blog ${!currentStatus ? 'published' : 'moved to drafts'}`)
            fetchData()
        } catch (error) {
            toast.error('Failed to update visibility')
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            if (modalType === 'certificate') {
                if (editingItem) {
                    await certificateService.update(editingItem._id, formData)
                    toast.success('Certificate updated')
                } else {
                    await certificateService.create(formData)
                    toast.success('Certificate created')
                }
            } else if (modalType === 'project') {
                if (editingItem) {
                    await projectService.update(editingItem._id, formData)
                    toast.success('Project updated')
                } else {
                    await projectService.create(formData)
                    toast.success('Project created')
                }
            } else if (modalType === 'blog') {
                if (editingItem) {
                    await blogService.update(editingItem._id, formData)
                    toast.success('Blog updated')
                } else {
                    await blogService.create(formData)
                    toast.success('Blog created')
                }
            }

            setShowModal(false)
            fetchData()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save')
        }
    }

    const fetchData = async () => {
        try {
            setLoading(true)
            const [pRes, bRes, mRes, cRes] = await Promise.all([
                projectService.getAll(),
                blogService.getAll(),
                messageService.getAll(),
                certificateService.getAll()
            ])
            setProjects(pRes.data)
            setBlogs(bRes.data)
            setMessages(mRes.data)
            setCertificates(cRes.data)
        } catch (error) {
            toast.error('Failed to load data')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id, type) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return

        try {
            if (type === 'project') await projectService.delete(id)
            else if (type === 'blog') await blogService.delete(id)
            else if (type === 'message') await messageService.delete(id)
            else if (type === 'certificate') await certificateService.delete(id)

            toast.success(`${type} deleted`)
            fetchData()
        } catch (error) {
            toast.error('Failed to delete')
        }
    }

    const tabs = [
        { id: 'projects', label: 'Projects', icon: FiFolder },
        { id: 'blogs', label: 'Blogs', icon: FiFileText },
        { id: 'certificates', label: 'Certificates', icon: FiAward },
        { id: 'messages', label: 'Messages', icon: FiMail },
    ]

    const openModal = (type, item = null) => {
        setModalType(type)
        setEditingItem(item)
        setShowModal(true)
    }

    return (
        <div className="pt-28 min-h-screen bg-gray-50/50 dark:bg-neutral-950 transition-colors duration-500">
            <div className="container mx-auto px-6 md:px-12 pb-24">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div>
                        <span className="text-xs font-black text-cyan-500 uppercase tracking-[0.4em] mb-3 block">Control Center</span>
                        <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter leading-none">
                            Admin <span className="text-shimmer">Dashboard</span>
                        </h1>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-8 py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-red-500 hover:text-white transition-all group"
                    >
                        <FiLogOut className="group-hover:-translate-x-1 transition-transform" />
                        Sign Out
                    </button>
                </div>

                {/* Stats Summary */}
                <DashboardStats
                    projectsCount={projects.length}
                    blogsCount={blogs.length}
                    certificatesCount={certificates.length}
                    messagesCount={messages.length}
                />

                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-4 mb-10 p-2 glass-card rounded-[2.5rem] border-white/5 w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-8 py-4 font-black uppercase tracking-[0.2em] text-[10px] rounded-3xl transition-all ${activeTab === tab.id
                                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                                    : 'text-gray-500 hover:bg-white/5 hover:text-neutral-900 dark:hover:text-white'
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="relative min-h-[400px]">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                        </div>
                    ) : (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'projects' && (
                                <ProjectManager
                                    projects={projects}
                                    onAdd={() => openModal('project')}
                                    onEdit={(p) => openModal('project', p)}
                                    onDelete={handleDelete}
                                />
                            )}
                            {activeTab === 'blogs' && (
                                <BlogManager
                                    blogs={blogs}
                                    onAdd={() => openModal('blog')}
                                    onEdit={(b) => openModal('blog', b)}
                                    onDelete={handleDelete}
                                    onTogglePublish={handleTogglePublish}
                                />
                            )}
                            {activeTab === 'certificates' && (
                                <CertificateManager
                                    certificates={certificates}
                                    onAdd={() => openModal('certificate')}
                                    onDelete={handleDelete}
                                />
                            )}
                            {activeTab === 'messages' && (
                                <MessageManager
                                    messages={messages}
                                    onDelete={handleDelete}
                                />
                            )}
                        </motion.div>
                    )}
                </div>
            </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/10"
          >
            <h2 className="text-3xl font-black mb-6 uppercase tracking-widest text-gradient">
              {editingItem ? 'Edit' : 'Add'} {modalType === 'certificate' ? 'Certificate' : modalType}
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {modalType === 'certificate' && (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Title</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. AWS Certified Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Issuer</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                        value={formData.issuer || ''}
                        onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                        placeholder="e.g. Amazon Web Services"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Issue Date</label>
                      <input
                        type="date"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                        value={formData.issueDate ? new Date(formData.issueDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Category</label>
                      <input
                        type="text"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="e.g. Frontend, Backend, AI..."
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Certificate PDF</label>
                      <div className="space-y-4">
                        <div className="relative">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleFileUpload(e, 'certificateLink')}
                            className="hidden"
                            id="pdf-upload"
                          />
                          <label
                            htmlFor="pdf-upload"
                            className="flex items-center justify-center gap-2 w-full bg-gray-50 dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/20 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-all text-[10px] font-bold"
                          >
                            <FiUpload />
                            <span>{formData.certificateLink ? 'File Uploaded' : 'Upload PDF'}</span>
                          </label>
                        </div>
                        <input
                          type="text"
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2 text-[10px] focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                          value={formData.certificateLink || ''}
                          onChange={(e) => setFormData({ ...formData, certificateLink: e.target.value })}
                          placeholder="Or paste URL"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Preview Image</label>
                      <div className="space-y-4">
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'image')}
                            className="hidden"
                            id="img-upload"
                          />
                          <label
                            htmlFor="img-upload"
                            className="flex items-center justify-center gap-2 w-full bg-gray-50 dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/20 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-all text-[10px] font-bold"
                          >
                            <FiUpload />
                            <span>{formData.image ? 'Image Uploaded' : 'Upload Image'}</span>
                          </label>
                        </div>
                        <input
                          type="text"
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2 text-[10px] focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                          value={formData.image || ''}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="Or paste URL"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {modalType === 'project' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Project Title</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Project Name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Category</label>
                      <select
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="">Select Category</option>
                        <option value="Web">Web Development</option>
                        <option value="AI">AI & ML</option>
                        <option value="App">Mobile App</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Short Description</label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Full Case Study (Markdown)</label>
                    <textarea
                      rows="6"
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[2rem] px-6 py-4 focus:ring-2 focus:ring-cyan-500 outline-none transition-all resize-none text-sm"
                      value={formData.longDescription || ''}
                      onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Github Link</label>
                      <input
                        type="text"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                        value={formData.githubLink || ''}
                        onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Live Demo</label>
                      <input
                        type="text"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                        value={formData.liveLink || ''}
                        onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {modalType === 'blog' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Post Title</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Category</label>
                      <input
                        type="text"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Content (Markdown)</label>
                    <textarea
                      rows="10"
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[2rem] px-6 py-4 focus:ring-2 focus:ring-cyan-500 outline-none transition-all resize-none text-sm"
                      value={formData.content || ''}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-4 bg-gray-100 dark:bg-white/5 rounded-2xl hover:bg-gray-200 dark:hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 px-6 py-4 bg-cyan-500 text-black rounded-2xl hover:bg-cyan-400 shadow-xl shadow-cyan-500/20 transition-all text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : editingItem ? 'Update Item' : 'Create Item'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Admin
