import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import { getAllUser, getItem } from '../../controllers/user';

const router = Router();

router.get('/:id', requireAuth, getItem);
router.get('/all', requireAuth, getAllUser);

export { router };
