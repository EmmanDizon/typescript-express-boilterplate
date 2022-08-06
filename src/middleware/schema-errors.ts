import { Response } from "express";
import httpStatus from "http-status";

export default async (content: any, res: Response) => {
  try {
    await content;
  } catch (errs: any) {
    const errors: string[] = [];

    errs.details.forEach((error: any): void => {
      errors.push(error.message);
    });

    res.status(httpStatus.BAD_REQUEST).send({
      success: false,
      errors,
    });
  }
};
