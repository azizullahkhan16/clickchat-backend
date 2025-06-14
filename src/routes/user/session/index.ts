import express from "express";
import {
  createSessionController,
  getSessionInfoController,
  getSessionsController,
} from "../../../controllers/session";
import { adminRouteMiddleware } from "../../../middlewares/admin-route-middleware";

const router = express.Router();

router.post("/create", createSessionController);
router.get("/:sessionId", adminRouteMiddleware, getSessionInfoController);
router.get("/", adminRouteMiddleware, getSessionsController);

export { router as sessionRouter };
