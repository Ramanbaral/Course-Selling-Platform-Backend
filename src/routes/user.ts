import { Router } from 'express';

import { auth } from '../middlewares/auth.js';
import { getAllCourse, purchaseCourse } from '../controllers/user.js';

const userRouter = Router();

userRouter.use(auth);

userRouter.get('/courses', getAllCourse);

userRouter.post('/purchase/:courseId', purchaseCourse);

export default userRouter;
