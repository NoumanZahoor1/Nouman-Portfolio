import { motion } from 'framer-motion'
import { FiCode, FiServer, FiDatabase, FiCloud, FiTool, FiUsers } from 'react-icons/fi'

const Skills = () => {
  const skillCategories = [
    {
      icon: FiCode,
      title: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Vue.js', level: 75 },
        { name: 'Angular', level: 70 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 80 },
        { name: 'TailwindCSS', level: 88 },
        { name: 'SASS/SCSS', level: 85 },
      ],
    },
    {
      icon: FiServer,
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 88 },
        { name: 'Python', level: 80 },
        { name: 'Django', level: 75 },
        { name: 'REST APIs', level: 90 },
        { name: 'GraphQL', level: 70 },
        { name: 'Microservices', level: 75 },
      ],
    },
    {
      icon: FiDatabase,
      title: 'Database',
      skills: [
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'MySQL', level: 75 },
        { name: 'Redis', level: 70 },
        { name: 'Firebase', level: 80 },
      ],
    },
    {
      icon: FiCloud,
      title: 'DevOps & Cloud',
      skills: [
        { name: 'AWS', level: 75 },
        { name: 'Docker', level: 80 },
        { name: 'Kubernetes', level: 65 },
        { name: 'CI/CD', level: 78 },
        { name: 'Git', level: 90 },
        { name: 'Linux', level: 85 },
      ],
    },
    {
      icon: FiTool,
      title: 'Tools & Others',
      skills: [
        { name: 'VS Code', level: 95 },
        { name: 'Postman', level: 90 },
        { name: 'Figma', level: 75 },
        { name: 'Jira', level: 80 },
        { name: 'Webpack', level: 75 },
        { name: 'Vite', level: 85 },
      ],
    },
    {
      icon: FiUsers,
      title: 'Soft Skills',
      skills: [
        { name: 'Communication', level: 90 },
        { name: 'Teamwork', level: 88 },
        { name: 'Problem Solving', level: 92 },
        { name: 'Leadership', level: 80 },
        { name: 'Time Management', level: 85 },
      ],
    },
  ]

  const currentlyLearning = [
    'Next.js 14',
    'Three.js',
    'Machine Learning',
    'System Design',
  ]

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-gradient">Skills & Expertise</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-12 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.section
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <category.icon className="text-3xl text-primary-500" />
                <h2 className="text-3xl font-semibold">{category.title}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-lg">{skill.name}</span>
                      <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-primary-500 to-purple-600 h-3 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Currently Learning */}
        <motion.section
          className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg p-8 text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">Currently Learning</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {currentlyLearning.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-lg font-semibold"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack Grid */}
        <motion.section
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-center mb-8">Tech Stack Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'TailwindCSS',
              'Python', 'Docker', 'AWS', 'Git', 'PostgreSQL', 'Redis',
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-4xl mb-2">{getTechIcon(tech)}</div>
                <div className="font-semibold">{tech}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

const getTechIcon = (tech) => {
  const icons = {
    React: '⚛️',
    'Node.js': '🟢',
    MongoDB: '🍃',
    Express: '🚀',
    TypeScript: '📘',
    TailwindCSS: '🎨',
    Python: '🐍',
    Docker: '🐳',
    AWS: '☁️',
    Git: '🔀',
    PostgreSQL: '🐘',
    Redis: '🔴',
  }
  return icons[tech] || '💻'
}

export default Skills
