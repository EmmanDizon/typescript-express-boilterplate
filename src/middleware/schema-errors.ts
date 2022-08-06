import { Response } from "express";
import httpStatus from "http-status";
import logger from "../config/logger";

export default async (content: any, res: Response) => {
  try {
    await content;
  } catch (errs: any) {
    const errors: string[] = [];

    errs.details.forEach((error: any): void => {
      errors.push(error.message);
    });

    logger.warn(errors);

    res.status(httpStatus.BAD_REQUEST).send({
      success: false,
      errors,
    });
  }
};
