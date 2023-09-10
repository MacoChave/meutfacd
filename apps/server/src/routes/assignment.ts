import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import {
	deleteItem,
	getExcelFile,
	getItem,
	getItems,
	postItem,
	putItem,
} from '../controllers/assignment';

const router = Router();

router.get('/', getExcelFile);
router.post('/one', requireAuth, getItem);
router.post('/all', requireAuth, getItems);
router.post('/', requireAuth, postItem);
router.put('/', requireAuth, putItem);
router.delete('/', requireAuth, deleteItem);

export { router };
