import { Router } from 'express';
import {
	bulkInsert,
	createItem,
	deleteItem,
	getItem,
	getItems,
	updateItem,
} from '../../controllers/user';
import { requireAuth } from '../../middlewares/requireAuth';

const router = Router();

router.get('/', requireAuth, getItem);
router.get('/all', requireAuth, getItems);
router.post('/bulk', bulkInsert);
router.post('/', requireAuth, createItem);
router.put('/', requireAuth, updateItem);
router.delete('/', requireAuth, deleteItem);

export { router };
