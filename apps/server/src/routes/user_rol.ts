import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import {
	deleteItem,
	getItem,
	getItems,
	postItem,
	putItem,
} from '../controllers/user_rol';

const router = Router();

router.post('/one', requireAuth, getItem);
router.post('/all', requireAuth, getItems);
router.post('/', requireAuth, postItem);
router.put('/', requireAuth, putItem);
router.delete('/', requireAuth, deleteItem);

export { router };
