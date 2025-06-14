import { NextFunction, Request, Response } from "express";
import { Admin } from "../../models/Admin";
import { BadRequestError } from "../../utils/error/bad-request-error";
import { ApiResponse, generateToken } from "../../utils";
import bcrypt from "bcrypt";

const adminRegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const admin = await Admin.exists({ email });
    if (admin) {
      throw new BadRequestError("Admin already exists with this email");
    }

    let newAdmin = Admin.build({
      firstName,
      lastName,
      email,
      password,
    });

    await newAdmin.save();

    res
      .status(201)
      .json(ApiResponse({}, "Admin registered successfully", true));
  } catch (error) {
    next(error);
  }
};

const adminLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new BadRequestError("No Admin Found With this Email");
    }

    const compare = await bcrypt.compare(password, admin.password);
    if (!compare) {
      throw new BadRequestError("Invalid Password");
    }

    const token = generateToken({
      id: admin.id,
      email: admin.email,
      isAdmin: true,
    });

    res
      .status(200)
      .json(
        ApiResponse({ admin, token }, "Admin logged in successfully", true)
      );
  } catch (error) {
    next(error);
  }
};

export { adminRegisterController, adminLoginController };
