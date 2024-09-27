import { Router } from 'express';

import { signin, signup } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/signup', signup);

authRouter.post('/login', signin);

export default authRouter;
