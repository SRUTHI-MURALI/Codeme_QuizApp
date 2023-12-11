import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from '../Connection/connection.js'
import userRouter from "../Routes/userRouter.js";
import adminRouter from "../Routes/adminRouter.js";

const app = express();

app.use(cors());
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB();
const port = process.env.PORT;

app.use("/user", userRouter);
app.use("/user", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port|| 3001);
