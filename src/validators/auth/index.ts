import { body, check } from "express-validator";
import { RequestHandler } from "express";
import { validateRequestMiddleware } from "../../middlewares/validate-request-middleware";

// Register validator middleware
export const adminRegisterValidator: RequestHandler[] = [
  check("email", "Email is required")
    .notEmpty()
    .isEmail()
    .withMessage("Email is invalid"),
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("Last Name is required"),
  body("password").notEmpty().withMessage("Password is required"),
  validateRequestMiddleware,
];

// Login validator middleware
export const loginValidator: RequestHandler[] = [
  check("email", "Email is required")
    .notEmpty()
    .isEmail()
    .withMessage("Email is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
  validateRequestMiddleware,
];
