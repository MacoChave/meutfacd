import { Router } from 'express';
import {
	actualizarItem,
	crearItem,
	eliminarItem,
	obtenerItem,
	obtenerItems,
} from '../controllers/usuario';

const router = Router();

router.get('/', obtenerItem);
router.get('/todos', obtenerItems);
router.post('/', crearItem);
router.put('/', actualizarItem);
router.delete('/', eliminarItem);

export { router };
