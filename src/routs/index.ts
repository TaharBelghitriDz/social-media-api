import { Router } from "express";
const routs = Router();
import userRout from "./user";

routs.use("/user", userRout);
export default routs;
