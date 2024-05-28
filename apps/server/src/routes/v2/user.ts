import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import { getAllUser, getItem } from '../../controllers/user';

const router = Router();

router.get('/all', requireAuth, getAllUser);
router.get('/:id', requireAuth, getItem);

export { router };
