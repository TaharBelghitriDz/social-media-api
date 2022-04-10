import schemaValidation, { emptyBody } from "../schemas";
import { Router } from "express";
import { addLike, findLikes, updateLike } from "../controllers/likes";

const likesRoute = Router();

likesRoute.use(schemaValidation(emptyBody));
likesRoute.post("/add", addLike);
likesRoute.post("/update", updateLike);
likesRoute.get("/find", findLikes);

export default likesRoute;
