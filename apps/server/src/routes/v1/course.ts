import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import {
	deleteItem,
	getItem,
	getItems,
	postItem,
	putItem,
} from '../../controllers/course';

const router = Router();

router.get('/all', requireAuth, getItems);
router.get('/:id', requireAuth, getItem);
router.post('', requireAuth, postItem);
router.put('', requireAuth, putItem);
router.delete('', requireAuth, deleteItem);

export { router };