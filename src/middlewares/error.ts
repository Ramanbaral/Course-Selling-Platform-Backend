import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import ApiError from '../utils/apiError.js';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';

const errorHandler = (
  err: ApiError | any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //log the error
  // err can be instance of zod validation error
  if (!(err instanceof ApiError)) {
    if (err instanceof PrismaClientKnownRequestError) {
      res.status(400).json({
        statusCode: 400,
        message: err.message,
        success: false,
        errors: err.meta,
        stack: err.stack,
      });
    } else if (err instanceof PrismaClientUnknownRequestError) {
      res.status(400).json({
        statusCode: 400,
        message: err.message,
        success: false,
        errors: '',
        stack: err.stack,
      });
    } else {
      res.status(500).json({
        statusCode: 500,
        message: err.message,
        success: false,
        errors: '',
        stack: err.stack,
      });
    }
  } else {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      success: err.success,
      errors: err.errors,
      stack: err.stack,
    });
  }
};

export default errorHandler;
