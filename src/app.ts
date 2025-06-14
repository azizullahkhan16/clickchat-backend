import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { router } from "./routes";
import { errorHandlerMiddleware } from "./middlewares/error-handler-middleware";
import path from "path";

dotenv.config();

const app = express();

/*-----------------------Configurations------------------*/
app.use(morgan("dev"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

/*-----------------------Routes------------------*/
app.use("/api", router);

/*-----------------------Error Handler------------------*/
app.use(errorHandlerMiddleware);

export { app };
