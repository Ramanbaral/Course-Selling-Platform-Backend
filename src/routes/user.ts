import { Router } from 'express';

import { auth } from '../middlewares/auth.middlewares.js';
import {
  getAllCourse,
  purchaseCourse,
} from '../controllers/user.controllers.js';

const userRouter = Router();

userRouter.use(auth);

userRouter.get('/courses', getAllCourse);

userRouter.post('/purchase/:courseId', purchaseCourse);

export default userRouter;
