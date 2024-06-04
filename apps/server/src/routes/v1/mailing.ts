import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import { sendInfoEmail, sendTemplate } from '../../controllers/mailing';

const router = Router();

router.post('/info', requireAuth, sendInfoEmail);
router.post('/template', requireAuth, sendTemplate);

export { router };
