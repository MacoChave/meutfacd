import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { createCertificate } from '../controllers/pdf';

const router = Router();

router.post('/dictamen', requireAuth, createCertificate);

export { router };
