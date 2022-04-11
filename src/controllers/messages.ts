import { messageDb } from "../models/messages";
import { Socket } from "socket.io";

export const sendMessage =
  (socket: Socket) =>
  ({ content, otherId }: { otherId: string; content: string }) =>
    messageDb
      .sendMessage(content, socket.data._id, otherId)
      .then((data) => socket.emit("sented"))
      .catch((err: any) => {
        if (!err.err) socket.emit("somthing went wrong");
        else socket.emit("err " + err.context);
      });
//6251948d3a2551a5fc5c5181
