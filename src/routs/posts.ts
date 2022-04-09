import {
  addComment,
  addLike,
  addPost,
  editComment,
  editPost,
  findCommnets,
  findLikes,
  findPost,
  removeCommnet,
  removePost,
  updateLike,
} from "../controllers/posts";

import { Router } from "express";
import { checkUser } from "middlewares/auth";
import schemaValidation, { emptyBody } from "schemas";
import { authSchema } from "schemas/auth";
import { addCommentSchema, addPostSchema } from "schemas/posts";

const postRout = Router();

// all of this routs need to valid user first
postRout.use(schemaValidation(authSchema), checkUser);

// post
postRout.post("/add", schemaValidation(addPostSchema), addPost);
postRout.post("/edit", schemaValidation(addPostSchema), editPost);
postRout.get("/remove", schemaValidation(emptyBody), removePost);
postRout.get("/find", schemaValidation(emptyBody), findPost);

// comment
postRout.post("/add/comment", schemaValidation(addCommentSchema), addComment);
postRout.post("/edit/commnet", schemaValidation(addCommentSchema), editComment);
postRout.get("/remove/comment", schemaValidation(emptyBody), removeCommnet);
postRout.get("/find/comment", schemaValidation(emptyBody), findCommnets);

// likes
postRout.use(schemaValidation(emptyBody));
postRout.post("/likes/add", addLike);
postRout.post("/likes/update", updateLike);
postRout.get("/likes/find", findLikes);

export default postRout;
