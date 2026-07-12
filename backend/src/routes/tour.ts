import { Router } from 'express';
import { createTour, createDeparture, updateCapacity } from '../controllers/tourController';
import { requirePermission } from '../middleware/auth';

const router = Router();

// Routes protected by RBAC
router.post('/tours', requirePermission('tour:manage'), createTour);
router.post('/departures', requirePermission('tour:manage'), createDeparture);
router.post('/departures/capacity', requirePermission('inventory:write'), updateCapacity);

export default router;
