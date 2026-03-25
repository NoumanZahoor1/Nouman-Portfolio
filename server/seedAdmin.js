import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio');

        // Clear existing users just in case
        await User.deleteMany({});

        const adminUser = {
            username: 'Nouman',
            email: 'nomijatoi456@gmail.com',
            password: 'password123', // I'll set a default one and tell the user
            role: 'admin'
        };

        await User.create(adminUser);

        console.log('✅ Admin user created successfully!');
        console.log('Email: nomijatoi456@gmail.com');
        console.log('Password: password123');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
