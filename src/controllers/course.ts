import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import asyncHandler from '@/utils/asyncHandler.js';
import ApiResponse from '@/utils/apiResponse.js';

const prisma = new PrismaClient();

export const createCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const adminId = req.admin.id;

    //add data validation (zod)
    const { title, desc, price, thumbnail, tags } = req.body;

    const c = await prisma.course.create({
      data: {
        title: title,
        desc: desc,
        price: price,
        thumbnail: thumbnail,
        tags: tags,
        creatorId: adminId,
      },
      select: {
        title: true,
      },
    });

    res.json(new ApiResponse(200, { title }, `Course ${c.title} Created`));
  },
);

export const courseInf = asyncHandler(async (req: Request, res: Response) => {
  const courseId = parseInt(req.params.id);

  const course = await prisma.course.findUniqueOrThrow({
    where: {
      id: courseId,
    },
  });

  res.json(new ApiResponse(200, { course }, 'successfully fetched course'));
});

export const deleteCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const adminId = req.admin.id;
    const courseId = parseInt(req.params.id);

    const course = await prisma.course.findUniqueOrThrow({
      where: {
        id: courseId,
        creatorId: adminId,
      },
      select: {
        title: true,
      },
    });

    await prisma.course.delete({
      where: {
        id: courseId,
      },
      select: {
        title: true,
      },
    });

    res.json(
      new ApiResponse(
        200,
        { title: course.title },
        `Deleted Course ${course.title}`,
      ),
    );
  },
);

export const modifyPrice = asyncHandler(async (req: Request, res: Response) => {
  const adminId = req.admin.id;
  const courseId = parseInt(req.params.id);

  //validate the req body
  const { price } = req.body;

  const course = await prisma.course.update({
    where: {
      id: courseId,
      creatorId: adminId,
    },
    data: {
      price: price,
    },
    select: {
      title: true,
    },
  });

  res.json(
    new ApiResponse(
      200,
      { title: course.title },
      `updated price of course: ${course.title}`,
    ),
  );
});
