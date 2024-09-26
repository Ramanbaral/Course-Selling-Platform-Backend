import { Request, Response } from 'express';
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
  const courseId = parseInt(req.params.courseId);
  console.log(courseId);

  try {
    //check for validity of courseId
    const c = await prisma.course.findUniqueOrThrow({
      where: {
        id: courseId,
      },
      select: {
        title: true
      }
    });

    //add payment methods and receive payment before assigning course to user
    await prisma.purchase.create({
      data: {
        userId: userId,
        courseId: courseId,
      },
    });

    res.json({
      msg: `Successfully Purchased course: ${c.title}`,
    });
  } catch (e) {
    console.log(e);
    console.error('Error while purchasing course');

    res.status(400).json({
      error: true,
      msg: 'Error while purchasing course',
    });
  }
};
