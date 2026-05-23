import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['express', 'bulk', 'maintenance'], required: true },
  date: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model('Schedule', scheduleSchema);
