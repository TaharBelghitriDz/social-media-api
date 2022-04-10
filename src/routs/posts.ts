import { addPost, editPost, findPost, removePost } from "../controllers/posts";
import { Router } from "express";
import { checkUser } from "../middlewares/auth";
import schemaValidation, { emptyBody } from "../schemas";
import { authSchema } from "../schemas/auth";
import { addPostSchema } from "../schemas/posts";

const postRout = Router();

// all of this routs need to valid user first
postRout.use(schemaValidation(authSchema, "headers"), checkUser);

// post
postRout.post("/add", schemaValidation(addPostSchema), addPost);
postRout.post("/edit", schemaValidation(addPostSchema), editPost);
postRout.get("/remove", schemaValidation(emptyBody), removePost);
postRout.get("/find", schemaValidation(emptyBody), findPost);

export default postRout;
