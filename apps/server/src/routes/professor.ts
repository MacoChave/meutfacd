import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { getBySchedule, getItems } from '../controllers/professor';

const router = Router();

router.get('/schedule', requireAuth, getBySchedule);
router.get('/all', requireAuth, getItems);
router.post('/', (req, res) => {});
router.put('/', (req, res) => {});
router.delete('/', (req, res) => {});

export { router };
