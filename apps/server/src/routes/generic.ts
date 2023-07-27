import { Router } from 'express';
import {
	createItem,
	createItems,
	getItem,
	getItems,
} from '../controllers/generic';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.post('/one', requireAuth, getItem);
router.post('/all', requireAuth, getItems);
router.post('/', requireAuth, createItem);
router.post('/many', requireAuth, createItems);

export { router };
