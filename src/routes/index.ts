import express, { Request, Response } from "express";
import { sessionRouter } from "./user/session";
import { adminAuthRouter } from "./admin/auth";
import { messageRouter } from "./user/message";
import { leadRouter } from "./admin/lead";
import { ApiResponse } from "../utils";
import { time, timeStamp } from "console";

const router = express.Router();

router.use("/admin/auth", adminAuthRouter);
router.use("/sessions", sessionRouter);
router.use("/chats", messageRouter);
router.use("/leads", leadRouter);

// test route
router.get("/health", (req: Request, res: Response) => {
  res
    .status(200)
    .json(
      ApiResponse(
        { timestamp: new Date().toISOString() },
        "Clickchat Server is healthy",
        true
      )
    );
});

export { router };
