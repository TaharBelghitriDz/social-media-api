import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { notFoundError, reqErrHandler } from "./middlewares/reqErorHandler";
import "./config/db.config";
import routs from "./routs/index";

dotenv.config({ path: __dirname + "/.env" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: 100 }));
app.use(cors());
app.use(helmet());
app.use("/v1", routs);

const PORT = process.env.PORT || 5000;

app.use(notFoundError);
app.use(reqErrHandler);

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
