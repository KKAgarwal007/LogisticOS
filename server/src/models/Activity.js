import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  type: { type: String, enum: ['alert', 'update', 'success'], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  iconType: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Activity', activitySchema);
