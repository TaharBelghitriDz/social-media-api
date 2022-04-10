import { Model, Document, FilterQuery } from "mongoose";

export interface postInterface extends Document {
  userId: string;
  content: string;
  cover: string[];
  likes: { userId: string; type: "like" | "dislike" | "love" | "angry" }[];
  coments: {
    userId: string;
    content: string;
    likes?: { userId: string; type: "like" | "dislike" | "love" | "angry" }[];
  }[];
}
export type likesTypes = "like" | "dislike" | "love" | "angry";

export interface newPostInterface {
  content: string;
  cover: string;
}

export interface postModelInterface extends Model<postInterface> {
  addPost: (args: postInterface, clb: (err: Error | null) => void) => void;
  editPost: (
    filter: FilterQuery<postInterface>,
    newData: postInterface,
    clb: (err: Error, rslt: any) => void
  ) => void;

  findPost: (
    query: FilterQuery<postInterface>[]
  ) => Promise<postInterface | null>;

  removePost: (
    query: FilterQuery<postInterface>[]
  ) => Promise<postInterface | null>;

  editComment: (
    args: {
      postId: string;
      userId: string;
      newContent: string;
    },
    clb: (err: Error | null, data: postInterface | null) => void
  ) => void;

  removeCommnet: (
    args: {
      postId: string;
      userId: string;
      commentId: string;
    },
    clb: (err: Error | null, data: postInterface | null) => void
  ) => void;

  addLike: (
    args: {
      id: string;
      postId: string;
      commentId?: string;
      like: string;
    },
    res: any
  ) => void;
  updateLike: (
    args: {
      id: string;
      postId: string;
      commentId?: string;
      like: string;
      remove: boolean;
    },
    res: any
  ) => void;
}
