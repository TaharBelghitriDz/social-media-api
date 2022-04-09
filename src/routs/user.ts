import { login, signUp } from "../controllers/user";
import { Router } from "express";
import schemaValidation from "../schemas";
import { loginSchema, signUpSchema } from "../schemas/user";
const userRout = Router();

userRout.post("/signup", schemaValidation(signUpSchema), signUp);
userRout.post("/login", schemaValidation(loginSchema), login);

export default userRout;
