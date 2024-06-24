import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import {
	actualizarItem,
	crearItem,
	eliminarItem,
	obtenerItem,
	obtenerItems,
} from '../../controllers/rol';

const router = Router();

router.get('/', requireAuth, obtenerItem);
router.get('/all', requireAuth, obtenerItems);
router.post('/', requireAuth, crearItem);
router.patch('/', requireAuth, actualizarItem);
router.delete('/', requireAuth, eliminarItem);

export { router };
