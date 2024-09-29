import { Router } from 'express';

import { auth } from '../middlewares/auth.js';
import { getAllCourse, purchaseCourse } from '../controllers/user.js';

const userRouter = Router();

userRouter.use(auth);

userRouter.route('/courses').get(getAllCourse);

userRouter.route('/purchase/:courseId').post(purchaseCourse);

export default userRouter;
