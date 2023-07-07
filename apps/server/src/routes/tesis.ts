import { Router } from 'express';
import {
	deleteItem,
	getItem,
	getItems,
	postItem,
	putItem,
} from '../controllers/tesis';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.get('/:id', requireAuth, getItem);
router.post('/history', requireAuth, getItems);
router.post('', requireAuth, postItem);
router.put('', requireAuth, putItem);
router.delete('', requireAuth, deleteItem);

export { router };
