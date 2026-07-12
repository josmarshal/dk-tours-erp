import { Router } from 'express';
import { createQuotation, convertQuotationToTravelFile } from '../controllers/b2bController';
import { requirePermission } from '../middleware/auth';

const router = Router();

// Routes protected by RBAC
router.post('/quotations', requirePermission('b2b:manage'), createQuotation);
router.post('/quotations/convert', requirePermission('b2b:manage'), convertQuotationToTravelFile);

export default router;
