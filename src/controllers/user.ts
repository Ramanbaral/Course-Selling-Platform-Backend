import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

const prisma = new PrismaClient();

export const getAllCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;

    const courses = await prisma.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: true,
      },
    });

    res.json(
      new ApiResponse(200, { courses }, 'Courses fetched successfully '),
    );
  },
);

export const purchaseCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const courseId = parseInt(req.params.courseId);

    //check for validity of courseId
    const c = await prisma.course.findUniqueOrThrow({
      where: {
        id: courseId,
      },
      select: {
        title: true,
      },
    });

    //add payment methods and receive payment before assigning course to user
    await prisma.purchase.create({
      data: {
        userId: userId,
        courseId: courseId,
      },
    });

    res.json(
      new ApiResponse(
        200,
        { courseTitle: c.title },
        `Successfully Purchased course: ${c.title}`,
      ),
    );
  },
);
