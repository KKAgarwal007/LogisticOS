import Shipment from '../models/Shipment.js';

export const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({ createdAt: -1 });
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shipments', error: error.message });
  }
};

export const createShipment = async (req, res) => {
  try {
    const newShipment = new Shipment(req.body);
    await newShipment.save();
    
    // Broadcast real-time update
    const io = req.app.get('io');
    if (io) {
      io.emit('shipment_created', newShipment);
    }

    res.status(201).json(newShipment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating shipment', error: error.message });
  }
};

export const updateShipmentColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const { columnId } = req.body;
    const updatedShipment = await Shipment.findByIdAndUpdate(id, { columnId }, { new: true });
    
    // Broadcast real-time update
    const io = req.app.get('io');
    if (io) {
      io.emit('shipment_updated', updatedShipment);
    }

    res.status(200).json(updatedShipment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating shipment', error: error.message });
  }
};
