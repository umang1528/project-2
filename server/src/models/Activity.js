import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    actor: { type: String, default: 'system' },
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetType: { type: String, default: '' },
    targetId: { type: mongoose.Schema.Types.ObjectId },
    details: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model('Activity', activitySchema);
