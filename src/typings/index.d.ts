import { Express } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: String;
      };
    }
  }
}

export interface IuserInReq {
  id: string;
}
