import express from "express";
import cors from "cors";
import helmet from "helmet";
import { notFoundError, reqErrHandler } from "./middlewares/reqErorHandler";
import routs, { socketio } from "./routs/index";
import { createServer } from "http";
import { Server } from "socket.io";
import validateSocketConnection from "./middlewares/validateSocketConnection";
import socketConfig from "./config/socket.config";
import {
  expressRateLimterMiddleware,
  socketIoRateLimterMiddleware,
} from "./middlewares/rateLimiter";
import "./config/db.config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: 100 }));
app.use(cors());
app.use(expressRateLimterMiddleware);
app.use(helmet());
app.use("/v1", routs);

app.use(notFoundError);
app.use(reqErrHandler);

const server = createServer(app);
const io = new Server(server, socketConfig);
io.use(socketIoRateLimterMiddleware);
io.use(validateSocketConnection);
io.on("connection", socketio);

export default server;
