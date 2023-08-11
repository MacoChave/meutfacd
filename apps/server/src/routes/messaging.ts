import { Router } from 'express';
import {
	deleteItem,
	getItem,
	getItems,
	postItem,
	putItem,
} from '../controllers/messaging';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.get('', requireAuth, getItem);
router.get('/all', requireAuth, getItems);
router.post('', requireAuth, postItem);
router.put('', requireAuth, putItem);
router.delete('', requireAuth, deleteItem);

export { router };
