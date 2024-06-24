import { Router } from 'express';
import {
	getFile,
	uploadDictamen,
	uploadDraft,
	uploadTesis,
} from '../../controllers/storage';
import { requireAuth } from '../../middlewares/requireAuth';

const router = Router();

router.get('/', requireAuth, getFile);
router.post('/draft', requireAuth, uploadDraft);
router.post('/thesis', requireAuth, uploadTesis);
router.post('/dictamen', requireAuth, uploadDictamen);

export { router };
