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
import { checkVersion } from '../../middlewares/requireVersion';

const router = Router();

router.get('/ayuda', setRandomPassowrd);
router.post('/login', loginHandler);
router.post('/logup', logupHandler);
router.put('/verified-email', verifyEmail);
router.post('/recovery', checkVersion, recoveryPassword);
router.put('/recovery', checkVersion, changePassword);
router.get('/profile', [requireAuth, checkVersion], profileHandler);

export { router };
