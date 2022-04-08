import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { notFoundError, reqErrHandler } from "./middlewares/reqErorHandler";
dotenv.config({ path: __dirname + "/.env" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: 100 }));
app.use(cors());
app.use(helmet());

const PORT = process.env.PORT || 5000;

app.use(notFoundError);
app.use(reqErrHandler);

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
