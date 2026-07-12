import { Router } from 'express';
import { createHotel, createRoomType, loadInventory } from '../controllers/hotelController';
import { requirePermission } from '../middleware/auth';

const router = Router();

// Routes protected by RBAC
router.post('/properties', requirePermission('hotel:manage'), createHotel);
router.post('/rooms', requirePermission('hotel:manage'), createRoomType);
router.post('/inventory', requirePermission('inventory:write'), loadInventory);

export default router;
