import express from 'express';
import path from 'path';

import authRouter from './routes/auth.routes.js';
import courseRouter from './routes/course.routes.js';
import userRouter from './routes/user.routes.js';
import adminRouter from './routes/admin.routes.js';

const app = express();

app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, 'public')));

app.use('/auth', authRouter);
app.use('/course', courseRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.listen(3000, () => {
  console.log('Listening on 3000 ...');
});
