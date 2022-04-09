import { POINT_CONVERSION_UNCOMPRESSED } from "constants";
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

postSchema.statics.editPost = (
  filter: FilterQuery<postInterface>,
  newData: postInterface,
  clb: (err: Error, rslt: any) => void
) => postDb.findOneAndUpdate(filter, newData, clb);

postSchema.statics.findPost = (
  query: FilterQuery<postInterface>[],
  range: number = 0
) =>
  postDb
    .findOne({ $or: query })
    .limit(range + 10)
    .skip(range);

postSchema.statics.removePost = (query: FilterQuery<postInterface>[]) =>
  postDb.findOneAndRemove({ $or: query });

postSchema.statics.editComment = (
  {
    postId,
    userId,
    newContent,
  }: {
    postId: string;
    userId: string;
    newContent: string;
  },
  clb: (err: Error | null, data: postInterface | null) => void
) =>
  postDb.findOneAndUpdate(
    {
      _id: postId,
      "coments.userId": userId,
    },
    {
      $set: {
        "coments.$.content": newContent,
      },
    },
    clb
  );
postSchema.statics.removeCommnet = (
  args: {
    postId: string;
    userId: string;
    commentId: string;
  },
  clb: (err: Error | null) => void
) =>
  postDb.findOne({ _id: args.postId }, (err: any, data: any) => {
    if (data) data.coments.pull({ _id: args.commentId, userId: args.userId });
    data.save(clb);
  });

export const postDb = mongoose.model<postInterface, postModelInterface>(
  "socialMediaApiPost",
  postSchema
);
