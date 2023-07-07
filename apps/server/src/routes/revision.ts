import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import {
	deleteItem,
	getItem,
	getItems,
	postItem,
	putItem,
} from '../controllers/revision';

const router = Router();

router.get('/:id', requireAuth, getItem);
router.get('', requireAuth, getItems);
router.post('', requireAuth, postItem);
router.put('', requireAuth, putItem);
router.delete('', requireAuth, deleteItem);

export { router };
