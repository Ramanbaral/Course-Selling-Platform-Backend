import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

import asyncHandler from '@/utils/asyncHandler.js';
import ApiError from '@/utils/apiError.js';
import ApiResponse from '@/utils/apiResponse.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'somesecret';
const SALTROUNDS = 3;
const p = new PrismaClient();

export const signin = asyncHandler(async (req: Request, res: Response) => {
  //use zod for data validation
  const { email, pwd } = req.body;

  const usr = await p.user.findFirstOrThrow({
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
  const pwdMatch = await bcrypt.compare(pwd, usr.password);
  if (!pwdMatch) throw new ApiError(400, '', 'Invalid email or password');

  const token = jwt.sign(
    {
      id: usr.id,
    },
    JWT_SECRET,
  );

  res.json(new ApiResponse(200, { token }, 'signin success'));
});

export const signup = asyncHandler(async (req: Request, res: Response) => {
  //use zod for data validation
  const { email, pwd } = req.body;

  //hash the pwd before storing in DB
  const hashedPwd = await bcrypt.hash(pwd, SALTROUNDS);

  await p.user.create({
    data: {
      email: email,
      password: hashedPwd,
    },
  });

  res.json(new ApiResponse(200, { email }, 'signup success'));
});
