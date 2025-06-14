import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  data: T;
}

export const ApiResponse = <T = any>(
  data: T = {} as T,
  message = "",
  status = false
): ApiResponse<T> => {
  return {
    status,
    message,
    data,
  };
};

export const generateToken = (payload: any) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
  return token;
};
