import { Router } from 'express';
import { postJournalEntry } from '../controllers/accountingController';
import { requirePermission } from '../middleware/auth';

const router = Router();

import { downloadInvoice } from '../controllers/invoiceController';

// Only users with finance:write can post journal entries
router.post('/journal', requirePermission('finance:write'), postJournalEntry);

// Generate Invoice PDF
router.get('/invoice/:bookingId', downloadInvoice);

export default router;
