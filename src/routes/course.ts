import { Router } from 'express';

import { auth } from '../middlewares/admin.js';
import {
  createCourse,
  deleteCourse,
  modifyPrice,
  courseInf,
} from '../controllers/course.js';

const courseRouter = Router();

courseRouter.use(auth);

courseRouter.post('/create', createCourse);

courseRouter.get('/:id', courseInf);

courseRouter.delete('/delete/:id', deleteCourse);

courseRouter.put('/modifyprice/:id', modifyPrice);

export default courseRouter;
