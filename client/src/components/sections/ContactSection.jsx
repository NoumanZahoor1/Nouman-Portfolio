import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiSend, FiPhone } from 'react-icons/fi'
import { messageService } from '../../services/api'
import toast from 'react-hot-toast'

const ContactSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await messageService.create(formData)
            toast.success('Message sent successfully!')
            setFormData({ name: '', email: '', subject: '', message: '' })
        } catch (error) {
            toast.error('Failed to send message')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="contact" className="section-padding min-h-screen flex items-center">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-bold mb-4 block">Get In Touch</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-16 uppercase tracking-wider">Contact Me</h2>

                    <div className="grid lg:grid-cols-5 gap-16">
                        <div className="lg:col-span-2 space-y-12">
                            <div className="space-y-8">
                                <div className="flex gap-8 items-center group">
                                    <div className="w-20 h-20 glass-card glass-card-hover rounded-3xl flex items-center justify-center text-cyan-500 border-white/5 transition-all duration-700">
                                        <FiMail size={28} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500/50 mb-2">Direct Mail</p>
                                        <h4 className="text-xl font-black tracking-tighter text-neutral-900 dark:text-white">nomijatoi456@gmail.com</h4>
                                    </div>
                                </div>

                                <div className="flex gap-8 items-center group">
                                    <div className="w-20 h-20 glass-card glass-card-hover rounded-3xl flex items-center justify-center text-purple-500 border-white/5 transition-all duration-700">
                                        <FiMapPin size={28} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-500/50 mb-2">Location</p>
                                        <h4 className="text-xl font-black tracking-tighter text-neutral-900 dark:text-white">Okara, Pakistan</h4>
                                    </div>
                                </div>

                                <div className="flex gap-8 items-center group">
                                    <div className="w-20 h-20 glass-card glass-card-hover rounded-3xl flex items-center justify-center text-pink-500 border-white/5 transition-all duration-700">
                                        <FiPhone size={28} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500/50 mb-2">Phone</p>
                                        <h4 className="text-xl font-black tracking-tighter text-neutral-900 dark:text-white">+92 317 7543733</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 glass-card rounded-[2.5rem] border-cyan-500/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
                                <h3 className="text-2xl font-black mb-4 leading-tight uppercase tracking-wider text-neutral-900 dark:text-white">Let's build <br /> something great!</h3>
                                <p className="text-sm text-gray-500 leading-relaxed mb-0 font-medium">I'm currently available for freelance work and full-time opportunities.</p>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        placeholder="NAME"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-2xl p-6 text-xs font-black tracking-widest focus:ring-2 ring-cyan-500 transition-all outline-none"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="EMAIL"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-2xl p-6 text-xs font-black tracking-widest focus:ring-2 ring-cyan-500 transition-all outline-none"
                                        required
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="SUBJECT"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-2xl p-6 text-xs font-black tracking-widest focus:ring-2 ring-cyan-500 transition-all outline-none"
                                    required
                                />
                                <textarea
                                    placeholder="MESSAGE"
                                    rows="6"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-[2rem] p-8 text-xs font-black tracking-widest focus:ring-2 ring-cyan-500 transition-all outline-none resize-none"
                                    required
                                ></textarea>

                                <button
                                    disabled={loading}
                                    className="w-full py-6 premium-gradient text-black font-black uppercase tracking-[0.5em] text-[10px] rounded-[2rem] hover:scale-105 active:scale-95 transition-all shadow-2x shadow-cyan-500/20 flex items-center justify-center gap-4 premium-button"
                                >
                                    {loading ? 'Sending...' : <><FiSend /> Send Message</>}
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default ContactSection
