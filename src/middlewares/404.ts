import { Request, Response, NextFunction } from 'express';

import ApiResponse from '../utils/apiResponse.js';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json(new ApiResponse(404, {}, `Couldn't Find : ${req.url}`));
};
