import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import ApiError from '../utils/apiError.js';

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //log the error 
  // if error is not is not a instance of ApiError convert 
  res.status(err.statusCode || 500).json({
    status: err.statusCode,
    errors: err.errors,
    message: err.message,
    stack: err.stack
  });
};

export default errorHandler;
