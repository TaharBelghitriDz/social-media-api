import { messageDb } from "../models/messages";
import { Socket } from "socket.io";

const sendMessage =
  (socket: Socket) =>
  ({ content, otherId }: { otherId: string; content: string }) =>
    messageDb
      .sendMessage(content, socket.data._id, otherId)
      .then(() => socket.emit("sented"))
      .catch(() => {
        socket.emit("somthing went wrong");
      });

const reaction =
  (socket: Socket) =>
  ({ reaction, otherId }: { otherId: string; reaction: string }) =>
    messageDb
      .reaction(reaction, socket.data._id, otherId)
      .then(() => socket.emit("sented"))
      .catch(() => {
        socket.emit("somthing went wrong");
      });

const removeMessage =
  (socket: Socket) =>
  ({ messageId, otherId }: { otherId: string; messageId: string }) =>
    messageDb
      .sendMessage(messageId, socket.data._id, otherId)
      .then(() => socket.emit("sented"))
      .catch(() => {
        socket.emit("somthing went wrong");
      });

const getMessages =
  (socket: Socket) =>
  (range: number = 0) =>
    messageDb
      .find({
        $or: [{ _id: socket.data._id }, { otherId: socket.data._id }],
      })
      .skip(0)
      .limit(range + 10)
      .exec((err, data) => {
        if (err || !data) socket.emit("somthing wrong happend");
        else socket.emit(`${data}`);
      });

const findChats =
  (socket: Socket) =>
  ({ chatId, range }: { chatId: string; range: number }) =>
    messageDb.find(
      {
        $or: [
          { _id: socket.data._id, chat: { $elemMatch: { _id: chatId } } },
          { otherId: socket.data._id, chat: { $elemMatch: { _id: chatId } } },
        ],
      },
      { chat: { $slice: [range, range + 10] } }
    );

// there is a bug sometimes it create new chat instead of pushing message

const messageController: any = {
  sendMessage,
  reaction,
  removeMessage,
  getMessages,
  findChats,
};
export default messageController;
