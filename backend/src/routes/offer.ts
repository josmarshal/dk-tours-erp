import { Router } from 'express';
import { createOffer, evaluateOffers } from '../controllers/offerController';
import { requirePermission } from '../middleware/auth';

const router = Router();

// Routes protected by RBAC
router.post('/', requirePermission('offer:manage'), createOffer);
router.post('/evaluate', requirePermission('offer:view'), evaluateOffers);

export default router;
