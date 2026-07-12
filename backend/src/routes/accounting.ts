import { Router } from 'express';
import { postJournalEntry } from '../controllers/accountingController';
import { requirePermission } from '../middleware/auth';

const router = Router();

// Only users with finance:write can post journal entries
router.post('/journal', requirePermission('finance:write'), postJournalEntry);

export default router;
