import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { createReport } from '../controllers/pdf';

const router = Router();

router.post('/dictamen', requireAuth, createReport);

export { router };
