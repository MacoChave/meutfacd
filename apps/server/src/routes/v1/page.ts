import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import { getItem, getChildrens, getParentPages } from '../../controllers/page';

const router = Router();

router.get('/parents/:id', requireAuth, getChildrens);
router.get('/parents', requireAuth, getParentPages);
router.get('/:id', requireAuth, getItem);

export { router };
