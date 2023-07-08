import { Router } from 'express';
import { getItem, getItems } from '../controllers/generic';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.post('', requireAuth, getItems);
router.post('/one', requireAuth, getItem);

export { router };
