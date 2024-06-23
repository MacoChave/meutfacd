import { Router } from 'express';
import {
	bulkInsert,
	createItem,
	deleteItem,
	getAllUser,
	getItem,
	getUsers,
	updateItem,
} from '../../controllers/user';
import { requireAuth } from '../../middlewares/requireAuth';

const router = Router();

router.get('/all', requireAuth, getAllUser);
router.get('/allORM', requireAuth, getUsers);
router.get('/:id', requireAuth, getItem);
router.post('/bulk', requireAuth, bulkInsert);
router.post('/', requireAuth, createItem);
router.put('/:id', requireAuth, updateItem);
router.delete('/:id', requireAuth, deleteItem);

export { router };
