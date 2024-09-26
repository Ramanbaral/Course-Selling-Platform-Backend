import {Request, Response} from "express"
import jwt from "jsonwebtoken"

export const getAllCourse = async (req: Request, res: Response) => {
  const userId = req.user.id;

  
}