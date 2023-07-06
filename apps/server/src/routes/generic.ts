import { Router } from 'express';
import { getItem } from '../controllers/generic';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.post('', requireAuth, getItem);

export { router };
