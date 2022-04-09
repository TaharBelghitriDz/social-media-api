import { Router } from "express";
import postRout from "./posts";
import userRout from "./user";

const routs = Router();

routs.use("/user", userRout);
routs.use("/post", postRout);

export default routs;
