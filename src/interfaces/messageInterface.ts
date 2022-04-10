import { Document, Model } from "mongoose";

export interface messageInterface extends Document {
  parent?: string;
  content: string;
  date: string;
  seen: boolean;
  pic?: string;
  reaction?: "like" | "hate" | "love" | "angry" | "";
}

export interface messageModelInterface extends Model<messageInterface> {
  sendMessage: (
    content: string,
    id: string,
    otherId: string
  ) => Promise<messageModelInterface>;
}
