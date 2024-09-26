import { Router } from 'express';

import { signin, signup } from '../controllers/auth.controllers.js';
import { auth } from '../middlewares/auth.middlewares.js';

const authRouter = Router();

authRouter.use(auth);

authRouter.post('/signup', signup);

authRouter.post('/login', signin);

export default authRouter;
