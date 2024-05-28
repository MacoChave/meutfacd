import { Router } from 'express';
import {
	changePassword,
	loginHandler,
	logupHandler,
	profileHandler,
	recoveryPassword,
	setRandomPassowrd,
	verifyEmail,
} from '../../controllers/auth';
import { requireAuth } from '../../middlewares/requireAuth';

const router = Router();

router.get('/ayuda', setRandomPassowrd);
router.post('/login', loginHandler);
router.post('/logup', logupHandler);
router.put('/verified-email', verifyEmail);
router.post('/recovery', recoveryPassword);
router.put('/recovery', changePassword);
router.get('/profile', requireAuth, profileHandler);

export { router };
