import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';

import logger from './utils/logger.js';
import authRouter from './routes/auth.js';
import courseRouter from './routes/course.js';
import userRouter from './routes/user.js';
import adminRouter from './routes/admin.js';

dotenv.config();
const morganFormat = ':method :url :status :response-time ms';
const app = express();

app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  }),
);

app.get('/', (req, res) => {
  res.send('Up and Running...');
});

app.use('/auth', authRouter);
app.use('/course', courseRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ...`);
});
