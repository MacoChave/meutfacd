import { Router } from 'express';
import {
	deleteItem,
	getItem,
	getItems,
	postItem,
	putItem,
} from '../../controllers/thesis';
import { requireAuth } from '../../middlewares/requireAuth';

const router = Router();

router.post('/one', requireAuth, getItem);
router.post('/all', requireAuth, getItems);
router.post('', requireAuth, postItem);
router.put('', requireAuth, putItem);
router.delete('', requireAuth, deleteItem);

export { router };
