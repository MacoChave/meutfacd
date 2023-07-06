import { Router } from 'express';
import { getFile, uploadDraft, uploadTesis } from '../controllers/storage';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.get('/', requireAuth, getFile);
router.post('/draft', requireAuth, uploadDraft);
router.post('/tesis', requireAuth, uploadTesis);

export { router };
