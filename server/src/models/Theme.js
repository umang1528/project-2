import mongoose from 'mongoose';

const themeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    palette: {
      background: String,
      surface: String,
      primary: String,
      accent: String,
      text: String,
    },
    settings: { type: mongoose.Schema.Types.Mixed, default: {} },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Theme', themeSchema);
