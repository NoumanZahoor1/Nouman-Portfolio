import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Certificate from './models/Certificate.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certificates = [
  {
    title: 'AI Fundamentals',
    issuer: 'Unknown',
    image: '/certificates/AI Fundamentals.png',
    category: 'AI',
  },
  {
    title: 'Generative AI Concepts',
    issuer: 'Unknown',
    image: '/certificates/Generative AI Concepts .png',
    category: 'AI',
  },
  {
    title: 'Introduction to ChatGPT',
    issuer: 'Unknown',
    image: '/certificates/Introduction to ChatGPT.png',
    category: 'AI',
  },
  {
    title: 'Introduction to SQL',
    issuer: 'Unknown',
    image: '/certificates/Introduction to SQL.png',
    category: 'Backend',
  },
  {
    title: 'LLMs Concept',
    issuer: 'Unknown',
    image: '/certificates/LLMs Concept.png',
    category: 'AI',
  },
  {
    title: 'Understanding Artificial Intelligence',
    issuer: 'Unknown',
    image: '/certificates/Understanding Artifical Intelligence .png',
    category: 'AI',
  },
  {
    title: 'Understanding Data Science',
    issuer: 'Unknown',
    image: '/certificates/Understanding Data Science.png',
    category: 'Data Science',
  },
  {
    title: 'Understanding Machine Learning',
    issuer: 'Unknown',
    image: '/certificates/Understanding Machine Learning.png',
    category: 'AI',
  },
  {
    title: 'Web Development',
    issuer: 'Unknown',
    image: '/certificates/WebDevelopmentCourse.IN .png',
    category: 'Web Development',
  },
  {
    title: 'Full Stack Development',
    issuer: 'Unknown',
    image: '/certificates/full-stack.png',
    category: 'Full Stack',
  },
  {
    title: 'MERN Stack',
    issuer: 'Unknown',
    image: '/certificates/mern-stack.png',
    category: 'Full Stack',
  }
];

const seedCertificates = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio');
        console.log('MongoDB connection SUCCESS');
        
        // You might want to clear existing ones, but let's just add new ones for now
        // await Certificate.deleteMany({});
        
        await Certificate.insertMany(certificates);
        console.log('Certificates seeded successfully!');
        
        process.exit();
    } catch (error) {
        console.error('Error seeding certificates:', error);
        process.exit(1);
    }
};

seedCertificates();
