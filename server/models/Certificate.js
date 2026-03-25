import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        issuer: {
            type: String,
            required: true,
            trim: true,
        },
        issueDate: {
            type: Date,
        },
        certificateLink: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            default: '',
        },
        category: {
            type: String,
            default: 'Other',
            trim: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Certificate', certificateSchema);
