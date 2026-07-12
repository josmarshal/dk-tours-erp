import { Router } from 'express';
import { createCorporateAccount, getCorporateLedger } from '../controllers/corporateController';
import { requirePermission } from '../middleware/auth';

const router = Router();

// Routes protected by RBAC
router.post('/accounts', requirePermission('corporate:manage'), createCorporateAccount);
router.get('/:corporateId/ledger', requirePermission('corporate:view'), getCorporateLedger);

export default router;
