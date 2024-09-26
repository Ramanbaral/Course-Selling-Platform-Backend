import { Express } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

export interface IuserInReq {
  id: string;
}
