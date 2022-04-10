import {
  messageInterface,
  messageModelInterface,
} from "../interfaces/messageInterface";
import { Schema, model } from "mongoose";
import { userDb } from "./user";

// you made a big mistake on db structure

const messageSchema = new Schema<messageInterface>({
  parent: {
    type: String,
    default: "",
  },
  content: String,
  date: String,
  seen: Boolean,
  pic: {
    type: String,
    default: "",
  },
  reaction: {
    type: String,
    default: "",
  },
});

messageSchema.statics.sendMessage = (
  content: string,
  _id: string,
  otherId: string
) =>
  new Promise<any>((resolve) => {
    resolve("");
  })
    .then(() =>
      userDb.FindUser({ _id: otherId }, (err, data) => {
        if (err || !data) throw { err: "unvalid user" };
        return;
      })
    )
    .then(() => {
      messageDb.findOne(
        {
          $or: [
            { _id, otherId },
            { otherId: _id, _id: otherId },
          ],
        },
        (err: any, data: any) => {
          if (err) throw { err: "unvalid user" };
          const clb = (err) => {
            if (err) throw { err: "somthing wrong happend" };
            return "sent";
          };
          if (!data) new messageDb({ content }).save(clb);
          data.
        }
      );
    });

export const messageDb = model<messageInterface, messageModelInterface>(
  "socialMediaApiMessage",
  messageSchema
);
