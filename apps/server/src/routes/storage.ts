import { Router } from 'express';
import { subirPuntoTesis, subirTesis } from '../controllers/storage';
import { requireAuth } from '../middlewares/requireAuth';
import { upload } from '../middlewares/upload';

const router = Router();

router.post('/punto', [upload.single('archivo')], subirPuntoTesis);

router.post('/tesis', [upload.single('archivo')], subirTesis);

export { router };
