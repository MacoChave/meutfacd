import { Router } from 'express';
import {
	deleteItem,
	getItem,
	getItems,
	postItem,
	updateItem,
} from '../controllers/access';

const router = Router();

router.post('/one', getItem);
router.post('/all', getItems);
router.post('/', postItem);
router.put('/', updateItem);
router.delete('/', deleteItem);

export { router };
