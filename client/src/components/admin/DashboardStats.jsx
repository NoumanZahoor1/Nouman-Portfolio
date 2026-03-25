import { motion } from 'framer-motion'
import { FiFolder, FiAward, FiFileText, FiMail } from 'react-icons/fi'

const DashboardStats = ({ projectsCount, certificatesCount, blogsCount, messagesCount }) => {
  const stats = [
    { label: 'Total Projects', value: projectsCount, icon: FiFolder, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Certificates', value: certificatesCount, icon: FiAward, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { label: 'Blog Posts', value: blogsCount, icon: FiFileText, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Messages', value: messagesCount, icon: FiMail, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-white/5 group hover:scale-105 transition-all duration-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">{stat.label}</p>
              <p className="text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">{stat.value}</p>
            </div>
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:rotate-12`}>
              <stat.icon size={24} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default DashboardStats
