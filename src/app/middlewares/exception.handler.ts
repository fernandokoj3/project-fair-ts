import { BaseError } from "@/models/error.types";
import { NextFunction, Request, Response } from "express";

export function exceptionHandlerMiddleware(
    error: BaseError | Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
  if (error instanceof BaseError) {
    return res.status(error.code).json({ message: error.message });
  }

  return res.status(500).json({ message: "Generic failure" });
}