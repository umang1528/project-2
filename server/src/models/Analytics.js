import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema(
  {
    eventType: { type: String, required: true },
    page: { type: String, default: '' },
    projectSlug: { type: String, default: '' },
    browser: { type: String, default: '' },
    device: { type: String, default: '' },
    country: { type: String, default: '' },
    referrer: { type: String, default: '' },
    sessionDuration: { type: Number, default: 0 },
    ip: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Analytics', analyticsSchema);
