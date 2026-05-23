import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seed: { type: String, required: true },
  role: { type: String, enum: ['Expert', 'Senior', 'Junior'], required: true },
  stars: { type: Number, required: true, min: 1, max: 5 },
  rating: { type: Number, required: true },
  experience: { type: String, required: true },
  vehicle: { type: String, required: true },
  status: { type: String, enum: ['On-Duty', 'Off-Duty', 'On-Leave'], default: 'On-Duty' },
}, { timestamps: true });

export default mongoose.model('Driver', driverSchema);
