import { Router } from 'express';

import { auth } from '../middlewares/auth.js';

const courseRouter = Router();

courseRouter.use(auth);

courseRouter.post('/create', (req, res) => {
  const { id } = req.user;
  res.end();
});

courseRouter.delete('/delete/:id', (req, res) => {
  const { id } = req.user;
  res.end();
});

courseRouter.put('/modifyprice/:id', (req, res) => {
  const { id } = req.user;
  res.end();
});

export default courseRouter;
