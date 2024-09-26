import { Router } from 'express';

const userRouter = Router();

userRouter.get('/courses', (req, res) => {
  res.end();
});

userRouter.post('/purchase/:courseId', (req, res) => {
  res.end();
});

export default userRouter;
