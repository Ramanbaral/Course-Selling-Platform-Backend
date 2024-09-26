import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCourse = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const courses = await prisma.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: true,
      },
    });

    res.json({
      msg: 'Success',
      courses,
    });
  } catch (e) {
    console.log(e);
    console.error('Error Fetching courses.');

    res.status(500).json({
      error: true,
      msg: 'Error Fetching courses',
    });
  }
};

export const purchaseCourse = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const courseId = req.params.courseId;

}
