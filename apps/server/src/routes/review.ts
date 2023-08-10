import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import {
	assignReview,
	deleteItem,
	getItem,
	getItems,
	getItemsByCurrentProf,
	postItem,
	putItem,
} from '../controllers/review';

const router = Router();

router.post('/one', requireAuth, getItem);
router.post('/all', requireAuth, getItems);
router.get('/professor', requireAuth, getItemsByCurrentProf);
router.post('/', requireAuth, postItem);
router.put('/assign', requireAuth, assignReview);
router.put('/', requireAuth, putItem);
router.delete('/', requireAuth, deleteItem);

export { router };
