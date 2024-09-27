import { Express } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: IuserInReq;
      admin: IadminInReq;
    }
  }
}

export interface IuserInReq {
  id: string;
}

export interface IadminInReq {
  id: number;
}
