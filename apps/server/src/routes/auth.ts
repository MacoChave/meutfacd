import { Router } from 'express';
import {
	loginHandler,
	logupHandler,
	profileHandler,
	verifyEmail,
} from '../controllers/auth';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.post('/login', loginHandler);
router.post('/logup', logupHandler);
router.put('/verified-email', verifyEmail);
router.put('/recovery', verifyEmail);
router.get('/profile', requireAuth, profileHandler);

export { router };
