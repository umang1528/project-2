import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    fullDescription: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: 'Portfolio' },
    hashtags: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    thumbnail: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    images: [
      {
        url: { type: String, default: '' },
        publicId: { type: String, default: '' },
      },
    ],
    views: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
    caseStudy: { type: String, default: '' },
    createdBy: { type: String, trim: true, default: 'admin' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.index({ title: 'text', shortDescription: 'text', fullDescription: 'text', category: 'text', hashtags: 'text' });

export default mongoose.model('Project', projectSchema);
