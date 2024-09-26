import { Router } from 'express';

import { auth } from '../middlewares/auth.middlewares.js';

const userRouter = Router();

userRouter.use(auth);

userRouter.get('/courses', (req, res) => {
  res.end();
});

userRouter.post('/purchase/:courseId', (req, res) => {
  res.end();
});

export default userRouter;
