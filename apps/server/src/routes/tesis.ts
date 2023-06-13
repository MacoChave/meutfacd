import { Router } from 'express';
import { getRevisionHistory, uploadTesisDraft } from '../controllers/tesis';
import { requireAuth } from '../middlewares/requireAuth';
import { upload } from '../middlewares/upload';

const router = Router();

router.get('', (req, res) => {});
router.get('/all', (req, res) => {});
router.post('', (req, res) => {});
router.post('/history', requireAuth, getRevisionHistory);
router.post('/draft', [requireAuth, upload.single('draft')], uploadTesisDraft);
router.put('', (req, res) => {});
router.delete('', (req, res) => {});

export { router };
