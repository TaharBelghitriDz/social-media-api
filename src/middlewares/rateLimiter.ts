import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { RequestHandler } from "express";

const socketIoRateLimter = new RateLimiterMemory({
  points: 5,
  duration: 1,
});

const expressRateLimter = new RateLimiterMemory({
  points: 3,
  duration: 1,
});

export const socketIoRateLimterMiddleware = (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) =>
  socketIoRateLimter
    .consume(socket.handshake.address)
    .then(() => next())
    .catch(() => next(new Error("too many requests")));

export const expressRateLimterMiddleware: RequestHandler = (req, res, next) =>
  expressRateLimter
    .consume(req.ip)
    .then(() => next())
    .catch(() => res.status(400).json({ err: "too many requests " }));
