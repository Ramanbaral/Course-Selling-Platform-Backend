import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { IadminInReq } from '../typings/index.js';
import ApiError from '../utils/apiError.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'somesecret';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json(new ApiError(401, '', 'Unauthorized'));
      } else {
        req.admin = <IadminInReq>decoded;
        next();
      }
    });
  } else {
    res.status(401).json(new ApiError(401, '', 'Unauthorized'));
  }
};
