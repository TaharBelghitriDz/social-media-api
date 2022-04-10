import {
  addComment,
  editComment,
  findCommnets,
  removeCommnet,
} from "../controllers/comments";
import schemaValidation, { emptyBody } from "../schemas";
import { addCommentSchema } from "../schemas/posts";
import { Router } from "express";
import { authSchema } from "../schemas/auth";
import { checkUser } from "../middlewares/auth";

const commentRout = Router();

commentRout.use(schemaValidation(authSchema, "headers"), checkUser);

commentRout.post("/add", schemaValidation(addCommentSchema), addComment);
commentRout.post("/edit", schemaValidation(addCommentSchema), editComment);
commentRout.get("/remove", schemaValidation(emptyBody), removeCommnet);
commentRout.get("/find", schemaValidation(emptyBody), findCommnets);

export default commentRout;
