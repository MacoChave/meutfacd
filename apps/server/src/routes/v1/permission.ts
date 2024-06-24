import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import {
	bulkInsert,
	bulkUpdate,
	createItem,
	deleteItem,
	getItem,
	getItems,
	updateItem,
} from '../../controllers/permission';

const router = Router();

router.get('', requireAuth, getItem);
router.get('/all', requireAuth, getItems);
router.post('', requireAuth, createItem);
router.post('/bulk', requireAuth, bulkInsert);
router.put('', requireAuth, updateItem);
router.put('/bulk', requireAuth, bulkUpdate);
router.delete('', requireAuth, deleteItem);

export { router };
