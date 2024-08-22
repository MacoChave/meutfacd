import { Router } from 'express';
import {
	createItem,
	deleteItem,
	getItems,
	getItemsByPeriod,
	updateItem,
} from '../../controllers/schedule';
import { requireAuth } from '../../middlewares/requireAuth';

const router = Router();

router.get('/all', requireAuth, getItems);
router.get('/period/:id_jornada', requireAuth, getItemsByPeriod);
// router.get('period/:period/schedule/:schedule', requireAuth, getItem);
router.post('/', requireAuth, createItem);
router.put('/', requireAuth, updateItem);
router.delete('/', requireAuth, deleteItem);

export { router };
