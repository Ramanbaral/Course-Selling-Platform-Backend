import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

export const healthCheck = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const data = {
      health: 'OK',
    };
    res.json(new ApiResponse(200, data, 'Server OK'));
  },
);
