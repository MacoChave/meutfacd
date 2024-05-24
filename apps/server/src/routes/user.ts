import { Router } from 'express';
import {
	updateItem,
	bulkInsert,
	createItem,
	deleteItem,
	getItem,
	getItems,
	getPaginatedItems,
} from '../controllers/user';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.get('/', requireAuth, getItem);
router.get('/all', requireAuth, getItems);
router.post('/paginated', requireAuth, getPaginatedItems);
router.post('/bulk', bulkInsert);
router.post('/', requireAuth, createItem);
router.put('/', requireAuth, updateItem);
router.delete('/', requireAuth, deleteItem);

export { router };
