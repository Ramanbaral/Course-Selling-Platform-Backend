import { Router } from 'express';

const adminRouter = Router();

adminRouter.post('/signup', (req, res) => {
  res.end();
});

adminRouter.post('/login', (req, res) => {
  res.end();
});

export default adminRouter;
