import { userDb } from "../models/user";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { tokenVrfy } from "../utils/token";

export default (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) => {
  const auth = socket.handshake.auth;
  if (!auth.token) next(new Error("unvalid token"));
  else {
    const secretKey = process.env.SECRETKEY as string;
    tokenVrfy(auth.token, secretKey, (err, decode) => {
      if (err) next(new Error("somthing went wrong "));
      else if (!decode) next(new Error("unvalid token"));
      else {
        userDb.findOne({ email: decode }).exec((err, data) => {
          if (err) next(new Error("somthing went wrong "));
          else if (!data) next(new Error("unvalid token"));
          else {
            socket.data = data;
            next();
          }
        });
      }
    });
  }
};

import { RateLimiterMemory } from "rate-limiter-flexible";

const socketIoRateLimter = new RateLimiterMemory({
  points: 5,
  duration: 1,
});

export const socketIoRateLimterMiddleware = (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) => {
  try {
    socketIoRateLimter.consume(socket.handshake.address);
    next();
  } catch {
    next(new Error("too many requests"));
  }
};
