import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import { getItem, getItems } from '../../controllers/user_rol';

const router = Router();

router.get('/user/:user/rol/:rol', requireAuth, getItem);
router.get('/all', requireAuth, getItems);

export { router };
