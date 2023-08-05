import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import {
	createItem,
	deleteItem,
	getItem,
	getItems,
	updateItem,
} from '../controllers/permission';

const router = Router();

router.get('', requireAuth, getItem);
router.get('/all', requireAuth, getItems);
router.post('', requireAuth, createItem);
router.put('', requireAuth, updateItem);
router.delete('', requireAuth, deleteItem);

export { router };
