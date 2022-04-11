import messagesSchemas from "../schemas/message";
import { Socket } from "socket.io";
import Ajv from "ajv";
import messageController from "../controllers/messages";

const ajv = new Ajv();

const valableTarget = [
  "sendMessage",
  "reaction",
  "removeMessage",
  "getMessages",
];

export const socketRouter = (socket: Socket) =>
  socket.onAny((target: string, data: any) => {
    try {
      if (typeof data !== "object") throw "unvalid ";

      if (!valableTarget.includes(target))
        socket.emit("somthing wrong happend");
      else {
        const schema = messagesSchemas[target];
        const validate = ajv.compile(schema);
        const checkReq = validate(data);
        if (!checkReq) socket.emit("unvlid emit");
        else socket.on(target, messageController[target](socket));
      }
    } catch (err) {
      socket.emit("unvalid message #1");
    }
  });
