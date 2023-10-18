import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { sendInfoEmail } from '../controllers/mailing';

const router = Router();

router.post('/info', requireAuth, sendInfoEmail);

export { router };
