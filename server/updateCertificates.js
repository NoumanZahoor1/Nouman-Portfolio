import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Certificate from './models/Certificate.js';

dotenv.config();

const updateCertificates = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio');
        console.log('MongoDB connection SUCCESS');
        
        const result = await Certificate.updateMany(
            { issuer: 'Unknown' },
            { $set: { issuer: 'Data Camp' } }
        );
        
        console.log(`Updated ${result.modifiedCount} certificates.`);
        
        process.exit();
    } catch (error) {
        console.error('Error updating certificates:', error);
        process.exit(1);
    }
};

updateCertificates();
