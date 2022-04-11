import {
  messageInterface,
  messageModelInterface,
} from "../interfaces/messageInterface";
import { Schema, model } from "mongoose";
import { userDb } from "./user";
import { userInterface } from "../interfaces/dbInterface";

// you made a big mistake on db structure

const messageSchema = new Schema<messageInterface>({
  userId: String,
  otherId: String,
  seen: {
    type: Boolean,
    default: false,
  },
  chat: [
    {
      parent: {
        type: String,
        default: "",
      },
      content: String,
      date: {
        type: String,
        default: `${Date()}`,
      },
      pic: {
        type: String,
        default: "",
      },
      reaction: {
        type: String,
        default: "",
      },
    },
  ],
});

messageSchema.statics.sendMessage = (
  content: string,
  _id: string,
  otherId: string
) =>
  userDb
    .find({ $or: [{ _id: otherId }, { _id: _id }] })
    .then((data) => {
      if (!data) throw { err: "unvalid user #1" };
      if (data.length !== 2) throw { err: "unvalid user #2" };
      return;
    })
    .then(() => {
      return messageDb.findOne({
        $or: [
          { otherId: otherId, userId: _id },
          { userId: otherId, otherId: _id },
        ],
      });
    })
    .then((data: any) => {
      if (data) {
        data.chat.push({ content });
        data.save((err: any) => {
          if (err) throw { err: "somthing wrong happend" };
          return;
        });
      }
      const newChat: any = new messageDb({ userId: _id, otherId });
      newChat.chat.push({ content });
      newChat.save((err: any) => {
        if (err) throw { err: "somthing wrong happend" };
        return;
      });
    });

messageSchema.statics.reaction = (
  reaction: string,
  _id: string,
  otherId: string,
  messageId: string
) =>
  userDb
    .find({ $or: [{ _id: otherId }, { _id: _id }] })
    .then((data) => {
      if (!data) throw { err: "unvalid user #1" };
      if (data.length !== 2) throw { err: "unvalid user #2" };
      return;
    })
    .then(() => {
      return messageDb.findOne({
        $or: [
          { otherId, userId: _id },
          { userId: otherId, otherId: _id },
        ],
      });
    })
    .then((data: any) => {
      if (!data) throw { err: "somthing wrong happend " };
      data.chat.id(messageId).reaction = reaction;
      data.save((err: any) => {
        if (err) throw { err: "somthing wrong happend" };
        return;
      });
    });

messageSchema.statics.removeMessage = (
  mesageId: string,
  _id: string,
  otherId: string
) =>
  userDb
    .find({ $or: [{ _id: otherId }, { _id: _id }] })
    .then((data) => {
      if (!data) throw { err: "unvalid user #1" };
      if (data.length !== 2) throw { err: "unvalid user #2" };
      return;
    })
    .then(() => {
      messageDb.findOne(
        {
          $or: [
            { otherId, userId: _id, chat: { $elemMatch: { _id: mesageId } } },
            {
              userId: otherId,
              otherId: _id,
              chat: { $elemMatch: { _id: mesageId } },
            },
          ],
        },
        (err: any, data: messageInterface | null) => {
          if (err) throw { err: "unvalid user #3" };
          if (!data) throw { err: "unvalid user #3" };
          return;
        }
      );
    });

// fix the save err like send message

export const messageDb = model<messageInterface, messageModelInterface>(
  "socialMediaApiMessage",
  messageSchema
);
