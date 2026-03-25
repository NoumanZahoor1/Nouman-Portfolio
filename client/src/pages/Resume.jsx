import { motion } from 'framer-motion'
import { FiDownload, FiBriefcase, FiBook, FiAward, FiCode } from 'react-icons/fi'

const Resume = () => {
  const experience = [
    {
      title: 'Full Stack Developer',
      company: 'Tech Company',
      period: '2024 - Present',
      description: [
        'Developed and maintained web applications using React and Node.js',
        'Collaborated with cross-functional teams to deliver high-quality software',
        'Implemented RESTful APIs and database solutions',
        'Mentored junior developers and conducted code reviews',
      ],
    },
    {
      title: 'Frontend Developer',
      company: 'Startup Inc.',
      period: '2023 - 2024',
      description: [
        'Built responsive user interfaces with React and TailwindCSS',
        'Optimized application performance and user experience',
        'Worked with design team to implement UI/UX designs',
      ],
    },
    {
      title: 'Junior Developer',
      company: 'Agency',
      period: '2022 - 2023',
      description: [
        'Developed client websites using modern web technologies',
        'Learned best practices and coding standards',
        'Participated in agile development processes',
      ],
    },
  ]

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University Name',
      period: '2018 - 2022',
      description: 'Focused on software engineering and web development',
    },
  ]

  const certifications = [
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      year: '2024',
    },
    {
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      year: '2023',
    },
    {
      name: 'React Developer Certification',
      issuer: 'Meta',
      year: '2023',
    },
  ]

  const skills = [
    'React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'JavaScript',
    'Python', 'Docker', 'AWS', 'Git', 'PostgreSQL', 'Redis',
  ]

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-gradient">Resume</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Professional experience and qualifications
          </p>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <FiDownload />
            Download PDF
          </a>
        </motion.div>

        {/* Experience */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <FiBriefcase className="text-3xl text-primary-500" />
            <h2 className="text-3xl font-semibold">Experience</h2>
          </div>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-primary-500 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {exp.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <FiBook className="text-3xl text-primary-500" />
            <h2 className="text-3xl font-semibold">Education</h2>
          </div>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-primary-500 font-medium">{edu.institution}</p>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">{edu.period}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <FiCode className="text-3xl text-primary-500" />
            <h2 className="text-3xl font-semibold">Technical Skills</h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-lg font-medium"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <FiAward className="text-3xl text-primary-500" />
            <h2 className="text-3xl font-semibold">Certifications</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
              >
                <h3 className="text-lg font-semibold mb-2">{cert.name}</h3>
                <p className="text-primary-500 mb-1">{cert.issuer}</p>
                <p className="text-gray-600 dark:text-gray-400">{cert.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Resume
