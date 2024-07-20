import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import {
	createPrintReport,
	createReport,
	createStudentSupport,
	dictamenCourse1,
} from '../../controllers/pdf';

const router = Router();

router.post('/dictamen', requireAuth, createReport);
router.post('/course1', dictamenCourse1);
router.post('/support', createStudentSupport);
router.post('/impresion', requireAuth, createPrintReport);

export { router };
