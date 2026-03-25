import { motion } from 'framer-motion'
import { FiDownload, FiCode, FiDatabase, FiServer, FiCloud } from 'react-icons/fi'

const About = () => {
  const skills = [
    { name: 'React', level: 90, icon: '⚛️' },
    { name: 'Node.js', level: 85, icon: '🟢' },
    { name: 'MongoDB', level: 80, icon: '🍃' },
    { name: 'Express', level: 85, icon: '🚀' },
    { name: 'JavaScript', level: 90, icon: '📜' },
    { name: 'TypeScript', level: 75, icon: '📘' },
    { name: 'TailwindCSS', level: 88, icon: '🎨' },
    { name: 'Git', level: 85, icon: '🔀' },
  ]

  const timeline = [
    {
      year: '2024',
      title: 'Full Stack Developer',
      company: 'Tech Company',
      description: 'Building scalable web applications',
    },
    {
      year: '2023',
      title: 'Frontend Developer',
      company: 'Startup',
      description: 'Creating beautiful user interfaces',
    },
    {
      year: '2022',
      title: 'Junior Developer',
      company: 'Agency',
      description: 'Learning and growing',
    },
  ]

  const categories = [
    { icon: FiCode, title: 'Frontend', skills: ['React', 'Vue', 'Angular', 'HTML/CSS'] },
    { icon: FiServer, title: 'Backend', skills: ['Node.js', 'Express', 'Python', 'REST APIs'] },
    { icon: FiDatabase, title: 'Database', skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'] },
    { icon: FiCloud, title: 'DevOps', skills: ['AWS', 'Docker', 'CI/CD', 'Git'] },
  ]

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-gradient">About Me</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate developer crafting digital experiences
          </p>
        </motion.div>

        {/* Bio Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-semibold mb-4">Hello! 👋</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                I'm a full-stack developer passionate about creating innovative web solutions.
                With expertise in the MERN stack, I build scalable applications that solve
                real-world problems.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                When I'm not coding, you can find me exploring new technologies, contributing
                to open-source projects, or sharing knowledge through blog posts.
              </p>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <FiDownload />
                Download CV
              </a>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-center mb-8">Skills</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="font-semibold">{skill.name}</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-primary-500 to-purple-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills by Category */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-center mb-8">Skills by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center"
              >
                <category.icon className="text-4xl text-primary-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="text-gray-600 dark:text-gray-400">
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-center mb-8">Experience Timeline</h2>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex gap-6 mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="flex-1">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div className="text-primary-500 font-semibold mb-2">{item.year}</div>
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <div className="text-gray-600 dark:text-gray-400 mb-2">{item.company}</div>
                    <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>
                  )}
                </div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default About
