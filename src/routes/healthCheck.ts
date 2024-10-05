import { Router } from 'express';

import { healthCheck } from '@/controllers/healthCheck.js';

const healthRouter = Router();

healthRouter.route('/health').get(healthCheck);

export default healthRouter;
