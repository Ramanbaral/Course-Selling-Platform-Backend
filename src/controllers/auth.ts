import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'somesecret';
const SALTROUNDS = 3;
const p = new PrismaClient();

export const signin = async (req: Request, res: Response) => {
  //use zod for data validation

  const { email, pwd } = req.body;

  try {
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
    if (!pwdMatch) throw new Error('Invalid password');

    const token = jwt.sign(
      {
        id: usr.id,
      },
      JWT_SECRET,
    );

    res.json({
      msg: 'signin success',
      token,
    });
  } catch (e) {
    console.log(e);

    res.status(401).json({
      error: true,
      msg: 'Invalid email or password',
    });
  }
};

export const signup = async (req: Request, res: Response) => {
  //use zod for data validation

  const { email, pwd } = req.body;

  try {
    //hash the pwd before storing in DB
    const hashedPwd = await bcrypt.hash(pwd, SALTROUNDS);

    await p.user.create({
      data: {
        email: email,
        password: hashedPwd,
      },
    });

    res.json({
      msg: 'signup success',
    });
  } catch (e) {
    console.log(e);
    console.error('Error while creating user');

    res.status(400).json({
      error: true,
      msg: 'Error while creating user',
    });
  }
};
