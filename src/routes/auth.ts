import { Router } from 'express';

import { signin, signup } from '../controllers/auth.controllers.js';

const authRouter = Router();

authRouter.post('/signup', signup);

authRouter.post('/login', signin);

export default authRouter;
