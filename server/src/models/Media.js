import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ['image', 'video', 'audio', 'file'], required: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    resourceType: { type: String, default: 'image' },
    folder: { type: String, default: 'portfolio' },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model('Media', mediaSchema);
