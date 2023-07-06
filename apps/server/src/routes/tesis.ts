import { Router } from 'express';
import { getRevisionHistory, postTesis } from '../controllers/tesis';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.get('', (req, res) => {});
// router.get('/all', (req, res) => {});
router.post('', requireAuth, postTesis);
router.post('/history', requireAuth, getRevisionHistory);
router.put('', (req, res) => {});
router.delete('', (req, res) => {});

export { router };
