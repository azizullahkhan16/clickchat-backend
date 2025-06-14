import dotenv from "dotenv";
import { app } from "./app";
import { connectDB } from "./config/db";

dotenv.config();

console.clear();

/*---------------------Starting the server*/
app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log("Server is running on port:", process.env.PORT);
});
