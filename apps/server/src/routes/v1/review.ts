import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import {
	assignReview,
	deleteItem,
	getItem,
	getItems,
	getItemsByTutor,
	getItemsByUser,
	getItemByUser,
	getXlsxReport,
	postItem,
	putItem,
} from '../../controllers/review';

const router = Router();

router.get('/', requireAuth, getItemByUser);
router.get('/professor', requireAuth, getItemsByTutor);
router.get('/all', requireAuth, getItemsByUser);
router.post('/xlsx', getXlsxReport);
router.get('/one', requireAuth, getItem);
router.post('/all', requireAuth, getItems);
router.post('/', requireAuth, postItem);
router.put('/assign', requireAuth, assignReview);
router.put('/', requireAuth, putItem);
router.delete('/', requireAuth, deleteItem);

export { router };
