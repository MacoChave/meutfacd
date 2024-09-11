import { Router } from 'express';
import {
	bulkInsert,
	createItem,
	deleteItem,
	getItem,
	getUsers,
	updateItem,
} from '../../controllers/user';
import { requireAuth } from '../../middlewares/requireAuth';

const router = Router();

router.get('/all', requireAuth, getUsers);
router.get('/:id', requireAuth, getItem);
router.post('/bulk', requireAuth, bulkInsert);
router.post('/', requireAuth, createItem);
router.put('/', requireAuth, updateItem);
router.delete('/:action/:id', requireAuth, deleteItem);

export { router };
