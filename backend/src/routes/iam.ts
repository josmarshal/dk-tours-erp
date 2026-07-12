import { Router } from 'express';
import { createOrganization, createUser, assignRole } from '../controllers/iamController';
import { requirePermission } from '../middleware/auth';

const router = Router();

router.post('/organizations', createOrganization); // In reality, highly restricted
router.post('/users', createUser);
router.post('/roles/assign', requirePermission('iam:manage_roles'), assignRole);

export default router;
