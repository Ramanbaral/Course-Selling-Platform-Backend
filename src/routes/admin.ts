import { Router } from 'express';

import { signup, signin } from '../controllers/admin.js';

const adminRouter = Router();

adminRouter.route('/signup').post(signup);

adminRouter.route('/signin').post(signin);

export default adminRouter;
