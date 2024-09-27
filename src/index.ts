import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import authRouter from './routes/auth.js';
import courseRouter from './routes/course.js';
import userRouter from './routes/user.js';
import adminRouter from './routes/admin.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, 'public')));

app.use('/auth', authRouter);
app.use('/course', courseRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ...`);
});
