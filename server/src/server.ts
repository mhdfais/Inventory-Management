import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConnect";
import cors from "cors";
import { corsOptions } from "./config/corsOptions";
import productRoute from "./routes/productRoute";
import stockRoute from "./routes/stockRoute";
import authRoute from "./routes/authRoute";

const app = express();

dotenv.config();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/stock", stockRoute);

const port = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on ${port}`);
    });
  })
  .catch((err) => {
    console.error("db connection failed");
  });
