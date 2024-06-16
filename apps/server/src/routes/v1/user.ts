import { Router } from 'express';
import {
	bulkInsert,
	createItem,
	deleteItem,
	getAllUser,
	getItem,
	getItems,
	updateItem,
} from '../../controllers/user';
import { requireAuth } from '../../middlewares/requireAuth';

const router = Router();

router.get('/all', requireAuth, getAllUser);
router.get('/:id', requireAuth, getItem);
router.post('/bulk', bulkInsert);
router.post('/', requireAuth, createItem);
router.put('/', requireAuth, updateItem);
router.delete('/', requireAuth, deleteItem);

export { router };
