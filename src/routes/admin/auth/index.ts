import express from "express";
import {
  adminRegisterController,
  adminLoginController,
} from "../../../controllers/auth";
import {
  adminRegisterValidator,
  loginValidator,
} from "../../../validators/auth";

const router = express.Router();

router.post("/register", adminRegisterValidator, adminRegisterController);
router.post("/login", loginValidator, adminLoginController);

export { router as adminAuthRouter };
