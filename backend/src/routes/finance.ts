import { Router } from 'express';
import { requestRefund, approveRefund } from '../controllers/financeController';
import { requirePermission } from '../middleware/auth';

const router = Router();

// Routes protected by RBAC
router.post('/refunds/request', requirePermission('finance:write'), requestRefund);
router.post('/refunds/approve', requirePermission('finance:approve'), approveRefund);

export default router;
