import { Document, Model } from "mongoose";

export interface messageInterface extends Document {
  userId: string;
  otherId: string;
  seen: boolean;
  chat: {
    parent?: string;
    content: string;
    date: string;
    pic?: string;
    reaction?: "like" | "hate" | "love" | "angry" | "";
  };
}

export interface messageModelInterface extends Model<messageInterface> {
  sendMessage: (
    content: string,
    id: string,
    otherId: string
  ) => Promise<messageModelInterface>;
  reaction: (
    reaction: string,
    id: string,
    otherId: string,
    messageId: string
  ) => Promise<messageModelInterface>;
  removeMessage: (
    message: string,
    id: string,
    mesageId: string
  ) => Promise<messageModelInterface>;
}

export interface reactionInterface {
  otherId: string;
  reaction: string;
  messageId: string;
}
export interface sendMessageInterface {
  otherId: string;
  content: string;
}
