import { Router } from 'express';
import { createChat, findChat, findUserChats } from '../controllers/chat';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.get('/', requireAuth, findUserChats);
router.get('/exact', requireAuth, findChat);
router.post('/', requireAuth, createChat);

export { router };
