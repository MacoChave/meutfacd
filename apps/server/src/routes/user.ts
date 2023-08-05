import { Router } from 'express';
import {
	actualizarItem,
	crearItem,
	eliminarItem,
	obtenerItem,
	obtenerItems,
} from '../controllers/user';

const router = Router();

router.get('/', obtenerItem);
router.get('/all', obtenerItems);
router.post('/', crearItem);
router.put('/', actualizarItem);
router.delete('/', eliminarItem);

export { router };
