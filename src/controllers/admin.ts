import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

import ApiResponse from '@/utils/apiResponse.js';
import ApiError from '@/utils/apiError.js';
import asyncHandler from '@/utils/asyncHandler.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'somesecret';
const SALTROUNDS = 3;
const p = new PrismaClient();

export const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //add validation for req.body(zod)
    const { email, role, pwd } = req.body;

    //hash the pwd before storing in DB
    const hashedPwd = await bcrypt.hash(pwd, SALTROUNDS);

    const admin = await p.admin.create({
      data: {
        email: email,
        password: hashedPwd,
        role: role,
      },
    });

    res.json(new ApiResponse(200, { email, role }, 'Signup Success'));
  },
);

export const signin = asyncHandler(async (req: Request, res: Response) => {
  //use zod for req.body validation
  const { email, pwd } = req.body;

  const admin = await p.admin.findFirstOrThrow({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  //check pwd with hashed password
  const pwdMatch = await bcrypt.compare(pwd, admin.password);
  if (!pwdMatch) throw new ApiError(400, '', 'Invalid email or password');

  const token = jwt.sign(
    {
      id: admin.id,
    },
    JWT_SECRET,
  );

  res.json(new ApiResponse(200, { token: token }, 'signin success'));
});
