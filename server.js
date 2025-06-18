import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import registerRoutes from "./routes/index.js";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json());

//routes
registerRoutes(app);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started and listening on port ${port}`);
});
