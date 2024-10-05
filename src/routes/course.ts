import { Router } from 'express';

import { auth } from '@/middlewares/admin.js';
import {
  createCourse,
  deleteCourse,
  modifyPrice,
  courseInf,
} from '@/controllers/course.js';

const courseRouter = Router();

courseRouter.use(auth);

courseRouter.route('/create').post(createCourse);

courseRouter.route('/:id').get(courseInf);

courseRouter.route('/delete/:id').delete(deleteCourse);

courseRouter.route('/modifyprice/:id').put(modifyPrice);

export default courseRouter;
