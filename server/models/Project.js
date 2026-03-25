import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    images: [{
      type: String,
    }],
    techStack: [{
      type: String,
    }],
    features: [{
      type: String,
    }],
    githubLink: {
      type: String,
      default: '',
    },
    liveLink: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['web', 'ml', 'other'],
      default: 'web',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'planned'],
      default: 'completed',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Project', projectSchema);
