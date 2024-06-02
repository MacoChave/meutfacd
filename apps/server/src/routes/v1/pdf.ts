import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import {
	createPrintReport,
	createReport,
	createStudentSupport,
} from '../../controllers/pdf';

const router = Router();

router.post('/dictamen', requireAuth, createReport);
router.post('/support', createStudentSupport);
router.post('/impresion', requireAuth, createPrintReport);

export { router };
