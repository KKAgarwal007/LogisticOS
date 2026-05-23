import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true, unique: true },
  class: { type: String, required: true },
  capacity: { type: Number, required: true },
  efficiency: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Maintenance', 'In Transit'], default: 'Active' },
}, { timestamps: true });

export default mongoose.model('Vehicle', vehicleSchema);
