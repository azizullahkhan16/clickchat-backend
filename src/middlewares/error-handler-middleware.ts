import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/error/custom-error";
import { ApiResponse } from "../utils";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof CustomError) {
    const errors = err.serializeErrors();
    const message = errors[0]?.message || "Something went wrong";

    res.status(err.statusCode).json(ApiResponse(errors, message, false));
    return;
  }

  res
    .status(400)
    .json(ApiResponse([], err.message || "Something went wrong", false));
};

export { errorHandler as errorHandlerMiddleware };
