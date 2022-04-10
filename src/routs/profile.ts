import { profileBio, profileCover } from "controllers/profile";
import { Router } from "express";
import { checkUser } from "../middlewares/auth";
import schemaValidation from "../schemas";
import { authSchema } from "../schemas/auth";

const profileRout = Router();

// all of this routs need to valid user first
profileRout.use(schemaValidation(authSchema, "headers"), checkUser);

// need the schema validation

profileRout.post("/bio", profileBio);
profileRout.post("/cover", profileCover);
profileRout.post("/follws", profileBio);

export default profileRout;
