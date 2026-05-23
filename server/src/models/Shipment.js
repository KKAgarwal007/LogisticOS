import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  priority: { type: String, enum: ['High', 'Medium', 'Low', 'Completed'], required: true },
  progress: { type: Number, required: true, min: 0, max: 100 },
  columnId: { type: String, enum: ['pending', 'scheduled', 'in_transit', 'delivered'], required: true },
}, { timestamps: true });

export default mongoose.model('Shipment', shipmentSchema);
