import { Router } from 'express';
import {
	actualizarItem,
	crearItem,
	eliminarItem,
	obtenerItem,
	obtenerItems,
} from '../controllers/rol';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.get('/', requireAuth, obtenerItem);
router.get('/all', requireAuth, obtenerItems);
router.post('/', requireAuth, crearItem);
router.put('/', requireAuth, actualizarItem);
router.delete('/', requireAuth, eliminarItem);

export { router };
