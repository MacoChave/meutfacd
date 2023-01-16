import { Router } from 'express';
import { loginHandler, profileHandler } from '../controller/auth.controller';
import { requireAuth } from '../middlewares/requireAuth';

const authRouter = Router();

authRouter.post('/login', loginHandler);
authRouter.get('/profile', requireAuth, profileHandler);

export default authRouter;
