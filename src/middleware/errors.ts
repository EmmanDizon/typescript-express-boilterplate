import { Request, Response, NextFunction } from "express";
import ErrorHandler from "@/utils/error-handler";

export default function errorMiddleWare(
  error: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status = error.statusCodes || 500;
  const message = error.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    error: {
      status,
      message,
    },
  });
}
