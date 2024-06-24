import { Router } from 'express';
import {
	deleteItem,
	getItem,
	getItems,
	postItem,
	updateItem,
} from '../../controllers/access';
import { requireAuth } from '../../middlewares/requireAuth';

const router = Router();

router.post('/one', requireAuth, getItem);
router.post('/all', requireAuth, getItems);
router.post('/', requireAuth, postItem);
router.put('/', requireAuth, updateItem);
router.delete('/', requireAuth, deleteItem);

export { router };
