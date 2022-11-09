import { BaseError } from "@/models/error.types";
import { NextFunction, Request, Response } from "express";
import { log } from "@/utils/logUtils";

export function exceptionHandlerMiddleware(
    error: BaseError | Error,
    _: Request,
    res: Response,
    next: NextFunction,
  ) {

  if (error instanceof BaseError) {
    log.error("Something wrong", "[CODE-400]", error)
    return res.status(error.code).json({ message: error.message });
  }
  
  log.error("something terrible", "[CODE-500]", error)
  return res.status(500).json({ message: "Generic failure" });
}