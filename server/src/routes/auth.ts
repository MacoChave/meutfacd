import { Router } from 'express';
import {
	loginHandler,
	logupHandler,
	profileHandler,
} from '../controllers/auth';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.get('/perfil', requireAuth, profileHandler);
router.post('/logup', logupHandler);
router.post('/login', loginHandler);

export { router };
