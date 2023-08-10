import { Router } from 'express';
import {
	loginHandler,
	logupHandler,
	profileHandler,
} from '../controllers/auth';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.post('/login', loginHandler);
router.post('/logup', logupHandler);
router.get('/profile', requireAuth, profileHandler);

export { router };
