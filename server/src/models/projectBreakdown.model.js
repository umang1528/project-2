import mongoose from 'mongoose';

const projectBreakdownSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: 'ProjectBreakdown',
  }
);

export default mongoose.model(
  'ProjectBreakdown',
  projectBreakdownSchema,
  'ProjectBreakdown'
);