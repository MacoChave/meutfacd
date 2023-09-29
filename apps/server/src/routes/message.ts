import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { createMessage, getMessage } from '../controllers/message';

const router = Router();

router.get('/', requireAuth, getMessage);
router.post('/', requireAuth, createMessage);

export { router };
