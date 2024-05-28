import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import {
	deleteItem,
	getItem,
	getItems,
	postItem,
	putItem,
	updateSalon,
} from '../../controllers/course_tutor';

const router = Router();

router.get('', requireAuth, getItem);
router.post('/all', requireAuth, getItems);
router.post('', requireAuth, postItem);
router.put('/salon', requireAuth, updateSalon);
router.put('', requireAuth, putItem);
router.delete('', requireAuth, deleteItem);

export { router };
