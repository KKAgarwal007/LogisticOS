import express from 'express';
import { getVehicles, createVehicle } from '../controllers/vehicleController.js';
import { getDrivers, createDriver } from '../controllers/driverController.js';
import { getShipments, createShipment, updateShipmentColumn } from '../controllers/shipmentController.js';
import { getActivities, createActivity } from '../controllers/activityController.js';

import { getSchedules, createSchedule } from '../controllers/scheduleController.js';

const router = express.Router();

// Vehicle Routes
router.get('/vehicles', getVehicles);
router.post('/vehicles', createVehicle);

// Driver Routes
router.get('/drivers', getDrivers);
router.post('/drivers', createDriver);

// Shipment Routes
router.get('/shipments', getShipments);
router.post('/shipments', createShipment);
router.patch('/shipments/:id', updateShipmentColumn);

// Activity Routes
router.get('/activities', getActivities);
router.post('/activities', createActivity);

// Schedule Routes
router.get('/schedules', getSchedules);
router.post('/schedules', createSchedule);

export default router;
