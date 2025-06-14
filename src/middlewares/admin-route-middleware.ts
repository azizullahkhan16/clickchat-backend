import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../utils/error/not-authorized-error";

interface UserPayload {
  id: string;
  email: string;
  isAdmin: boolean;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export const adminRouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let token =
    req.body?.token || req.query?.token || req.headers["authorization"];
  try {
    if (!token) {
      throw new NotAuthorizedError("Token is required");
    }

    const decodePayload = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.SECRET_KEY!
    ) as UserPayload;

    if (!decodePayload) {
      throw new NotAuthorizedError("Invalid token");
    }

    req.currentUser = decodePayload;
    next();
  } catch (error) {
    next(error);
  }

  next();
};
