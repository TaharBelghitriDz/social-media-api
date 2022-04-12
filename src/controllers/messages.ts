import { messageDb } from "../models/messages";
import { Socket } from "socket.io";
import {
  reactionInterface,
  sendMessageInterface,
} from "interfaces/messageInterface";

const sendMessage =
  (socket: Socket) =>
  ({ content, otherId }: sendMessageInterface) =>
    messageDb
      .sendMessage(content, socket.data._id, otherId)
      .then(() => socket.emit("sented"))
      .catch((err) => {
        socket.emit("somthing went wrong #10");
      });

const reaction =
  (socket: Socket) =>
  ({ reaction, otherId, messageId }: reactionInterface) =>
    messageDb
      .reaction(reaction, socket.data._id, otherId, messageId)
      .then(() => socket.emit("sented"))
      .catch(() => {
        socket.emit("somthing went wrong");
      });

const removeMessage =
  (socket: Socket) =>
  ({ messageId, otherId }: { otherId: string; messageId: string }) =>
    messageDb
      .removeMessage(messageId, socket.data._id, otherId)
      .then(() => socket.emit("sented"))
      .catch((err) => {
        socket.emit("somthing went wrong");
      });

const getMessages =
  (socket: Socket) =>
  ({ range }: { range: number }) =>
    messageDb
      .find({
        $or: [{ userId: socket.data._id }, { otherId: socket.data._id }],
      })
      .skip(range)
      .limit(range + 10)
      .exec((err, data) => {
        if (err || !data) socket.emit("somthing wrong happend");
        else socket.emit(JSON.stringify(data));
      });

const findChats =
  (socket: Socket) =>
  ({ chatId, range }: { chatId: string; range: number }) =>
    messageDb
      .findOne(
        {
          $or: [
            { userId: socket.data._id, chat: { $elemMatch: { _id: chatId } } },
            { otherId: socket.data._id, chat: { $elemMatch: { _id: chatId } } },
          ],
        },
        { chat: { $slice: [range, range + 10] } }
      )
      .then((data) => {
        socket.emit(JSON.stringify(data));
      });

const messageController: any = {
  sendMessage,
  reaction,
  removeMessage,
  getMessages,
  findChats,
};
export default messageController;
