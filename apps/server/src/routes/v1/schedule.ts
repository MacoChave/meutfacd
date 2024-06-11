import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import {
	createItem,
	deleteItem,
	getItem,
	getItems,
	updateItem,
} from '../../controllers/schedule';

const router = Router();

router.get('/all', requireAuth, getItems);
router.get('/:period/:schedule', requireAuth, getItem);
router.post('/', requireAuth, createItem);
router.put('/', requireAuth, updateItem);
router.delete('/', requireAuth, deleteItem);

export { router };
