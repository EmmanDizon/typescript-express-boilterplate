import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";
import handleJoiErrors from "../middleware/schema-errors";

export default function validationMiddleware(
  schema: Joi.Schema
): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const options = {
      abortEarly: false, // continous searching for other possible validations
      allowUnknown: false, // will not allow key and value pairs that is not part of schema
    };

    handleJoiErrors(
      (async () => {
        const value = await schema.validateAsync(req.body, options);
        req.body = value;
        next();
      })(),
      res
    );
  };
}
