import express from "express";
import { adminRouteMiddleware } from "../../../middlewares/admin-route-middleware";
import {
  addLeadController,
  getLeadsController,
  getLeadInfoController,
  updateLeadController,
  deleteLeadController,
} from "../../../controllers/lead";

const router = express.Router();

router.post("/:sessionId/lead", adminRouteMiddleware, addLeadController);
router.get("/", adminRouteMiddleware, getLeadsController);
router.get("/:leadId", adminRouteMiddleware, getLeadInfoController);
router.put("/:leadId", adminRouteMiddleware, updateLeadController);
router.delete("/:leadId", adminRouteMiddleware, deleteLeadController);

export { router as leadRouter };
