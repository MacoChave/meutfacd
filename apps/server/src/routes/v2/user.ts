import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import { createItem, getAllUser, getItem } from '../../controllers/user';

const router = Router();

router.get('/all', requireAuth, getAllUser);
router.get('/:id', requireAuth, getItem);
router.post('/', requireAuth, createItem);

export { router };
