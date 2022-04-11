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
    content: string,
    id: string,
    otherId: string
  ) => Promise<messageModelInterface>;
  removeMessage: (
    message: string,
    id: string,
    mesageId: string
  ) => Promise<messageModelInterface>;
}
