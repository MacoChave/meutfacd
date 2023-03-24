import { Router } from 'express';
import {
	loginEstudianteHandler,
	loginProfesorHandler,
	logupEstudianteHandler,
	logupProfesorHandler,
	profileHandler,
} from '../controllers/auth';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.post('/logup/estudiante', logupEstudianteHandler);
router.post('/login/estudiante', loginEstudianteHandler);
router.post('/logup/profesor', logupProfesorHandler);
router.post('/login/profesor', loginProfesorHandler);
router.get('/profile', requireAuth, profileHandler);

export { router };
