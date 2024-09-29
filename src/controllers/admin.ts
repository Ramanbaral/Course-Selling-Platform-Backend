import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

import ApiResponse from '../utils/apiResponse.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'somesecret';
const SALTROUNDS = 3;
const p = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  //add validation for req.body(zod)
  const { email, role, pwd } = req.body;

  try {
    //hash the pwd before storing in DB
    const hashedPwd = await bcrypt.hash(pwd, SALTROUNDS);

    await p.admin.create({
      data: {
        email: email,
        password: hashedPwd,
        role: role,
      },
    });

    res.json(new ApiResponse(200, { email }, 'Signup Success'));
  } catch (e) {
    console.log(e);
    console.error('Error while creating Admin');

    res
      .status(400)
      .json(
        new ApiResponse(400, { error: true }, 'Problem while creating Admin'),
      );
  }
};

export const signin = async (req: Request, res: Response) => {
  //use zod for validation

  const { email, pwd } = req.body;

  try {
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
    if (!pwdMatch) throw new Error('Invalid password');

    const token = jwt.sign(
      {
        id: admin.id,
      },
      JWT_SECRET,
    );

    res.json(new ApiResponse(200, { token: token }, 'signin success'));
  } catch (e) {
    console.log(e);

    res
      .status(401)
      .json(new ApiResponse(401, { error: true }, 'Invalid email or password'));
  }
};
