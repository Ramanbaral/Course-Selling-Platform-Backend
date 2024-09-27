import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCourse = async (req: Request, res: Response) => {
  const adminId = req.admin.id;

  //add data validation (zod)
  const { title, desc, price, thumbnail, tags } = req.body;

  try {
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

    res.json({
      msg: `Course ${c.title} Created`,
    });
  } catch (e) {
    console.log(e);

    res.status(400).json({
      error: true,
      msg: 'Error while creating course',
    });
  }
};

export const courseInf = async (req: Request, res: Response) => {
  const courseId = parseInt(req.params.id);

  try {
    const course = await prisma.course.findUniqueOrThrow({
      where: {
        id: courseId,
      },
    });

    res.json({
      msg: 'success',
      course,
    });
  } catch (e) {
    console.log(e);

    res.status(400).json({
      error: true,
      msg: 'Course not found',
    });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  const adminId = req.admin.id;
  const courseId = parseInt(req.params.id);

  try {
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

    res.json({
      msg: `Deleted Course ${course.title}`,
    });
  } catch (e) {
    console.log(e);

    res.status(400).json({
      error: true,
      msg: 'something went wrong',
    });
  }
};

export const modifyPrice = async (req: Request, res: Response) => {
  const adminId = req.admin.id;
  const courseId = parseInt(req.params.id);

  const { price } = req.body;

  try {
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

    res.json({
      msg: `updated price of course: ${course.title}`,
    });
  } catch (e) {
    console.log(e);

    res.status(400).json({
      error: true,
      msg: 'Error updating price',
    });
  }
};
