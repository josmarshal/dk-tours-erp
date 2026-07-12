import { Router } from 'express';
import { getSalesReport, getProfitabilityReport } from '../controllers/reportController';
import { requirePermission } from '../middleware/auth';

const router = Router();

// Routes protected by RBAC
router.get('/sales', requirePermission('report:view'), getSalesReport);
router.get('/profitability', requirePermission('report:view'), getProfitabilityReport);

export default router;
