import { Router } from 'express';

const courseRouter = Router();

courseRouter.post('/create', (req, res) => {
  res.end();
});

courseRouter.delete('/delete/:id', (req, res) => {
  res.end();
});

courseRouter.put("/modifyprice/:id", (req, res) => {
  res.end();
})

export default courseRouter;
