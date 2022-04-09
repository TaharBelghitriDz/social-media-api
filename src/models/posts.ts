import { postInterface, postModelInterface } from "interfaces/postsInterdace";
import mongoose, { Schema, FilterQuery } from "mongoose";

const postSchema: Schema<postInterface> = new mongoose.Schema<postInterface>({
  userId: String,
  content: String,
  cover: [String],
  likes: [{ userId: String, type: String }],
  coments: [
    {
      userId: String,
      content: String,
      likes: [{ userId: String, type: String }],
    },
  ],
});

postSchema.statics.addPost = (
  args: postInterface,
  clb: (err: Error | null) => void
) => new postDb(args).save(clb);

postSchema.statics.findPost = (query: FilterQuery<postInterface>[]) =>
  postDb.findOne({ $or: query });

postSchema.statics.removePost = (query: FilterQuery<postInterface>[]) =>
  postDb.findOneAndRemove({ $or: query });

export const postDb = mongoose.model<postInterface, postModelInterface>(
  "socialMediaApiPost",
  postSchema
);
