import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import {
	deleteItem,
	getDetails,
	getExcelFile,
	getItem,
	getItems,
	postItem,
	putItem,
} from '../controllers/assignment';

const router = Router();

router.get('/', requireAuth, getExcelFile);
router.post('/one', requireAuth, requireAuth, getItem);
router.post('/details', requireAuth, getDetails);
router.post('/all', requireAuth, requireAuth, getItems);
router.post('/', requireAuth, requireAuth, postItem);
router.put('/', requireAuth, requireAuth, putItem);
router.delete('/', requireAuth, requireAuth, deleteItem);

export { router };
