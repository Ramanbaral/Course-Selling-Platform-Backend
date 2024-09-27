import { Router } from 'express';

import { signup, signin } from '../controllers/admin.js';

const adminRouter = Router();

adminRouter.post('/signup', signup);

adminRouter.post('/login', signin);

export default adminRouter;
