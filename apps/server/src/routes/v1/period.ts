import { Router } from 'express';
import {
	createItem,
	deleteItem,
	getItem,
	getItems,
	updateItem,
} from '../../controllers/period';
import { requireAuth } from '../../middlewares/requireAuth';

const router = Router();

router.get('/all', requireAuth, getItems);
router.get('/:id', requireAuth, getItem);
router.post('', requireAuth, createItem);
router.put('', requireAuth, updateItem);
router.delete('', requireAuth, deleteItem);

export { router };
