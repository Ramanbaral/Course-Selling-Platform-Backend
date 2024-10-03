import { Router } from 'express';

import { signin, signup } from '../controllers/auth.js';

const authRouter = Router();

authRouter.route('/signup').post(signup);

authRouter.route('/signin').post(signin);

export default authRouter;
