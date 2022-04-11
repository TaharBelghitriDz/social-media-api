import { Socket } from "socket.io";
import { Router } from "express";
import commentRout from "./comments";
import likesRoute from "./likes";
import postRout from "./posts";
import profileRout from "./profile";
import userRout from "./user";
import { socketRouter } from "./messages";

const routs = Router();

// don't forget router handler

routs.use("/user", userRout);
routs.use("/post", postRout);
routs.use("/comments", commentRout);
routs.use("/like", likesRoute);
routs.use("/profile", profileRout);

// socketio router

export const socketio = (socket: Socket) => {
  socketRouter(socket);
};

export default routs;
