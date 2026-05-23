import Schedule from '../models/Schedule.js';

export const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ date: 1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSchedule = async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    const savedSchedule = await schedule.save();
    
    // Optionally emit event if needed for realtime dashboard later
    const io = req.app.get('io');
    if (io) {
      io.emit('schedule_created', savedSchedule);
    }
    
    res.status(201).json(savedSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
