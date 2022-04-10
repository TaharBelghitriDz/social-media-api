import { profileEdit, profileFollow } from "../controllers/profile";
import { Router } from "express";
import { checkUser } from "../middlewares/auth";
import schemaValidation from "../schemas";
import { authSchema } from "../schemas/auth";

const profileRout = Router();

// all of this routs need to valid user first
profileRout.use(schemaValidation(authSchema, "headers"), checkUser);

// need the schema validation

profileRout.post("/bio", profileEdit);
profileRout.post("/cover", profileEdit);
profileRout.post("/name", profileEdit);
profileRout.post("/follws", profileFollow);

export default profileRout;
