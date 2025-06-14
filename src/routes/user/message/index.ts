import express from "express";
import {
  addMessageController,
  getMessagesController,
} from "../../../controllers/message";

const router = express.Router();

router.post("/:sessionId/message", addMessageController);
router.get("/:sessionId/messages", getMessagesController);

export { router as messageRouter };
