import { RequestHandler } from "express";
import { checkLikes } from "../utils/validation";
import { postDb } from "../models/posts";
import resHelper from "../utils/resHelper";

export const addLike: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const id = res.locals.user._id as string;
  const postId = req.query.postId as string;
  const commentId =
    req.query.commentid === "none"
      ? undefined
      : (req.query.commentid as string);
  const like = req.query.like as string;

  if (like && checkLikes(like))
    postDb.addLike({ like, id, commentId, postId }, res);
  else res.bad("somthing wrong happned");
};

export const updateLike: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const id = res.locals.user._id as string;
  const postId = req.query.postId as string;
  const commentId = (req.query.coommntid as string) || undefined;
  const like = req.query.like as string;
  const remove = req.query.remove === "yes";

  if (like && checkLikes(like))
    postDb.updateLike({ like, id, commentId, postId, remove }, res);
  else res.bad("somthing wrong happned");
};

export const findLikes: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const postId = req.query.postId as string;
  const commentId = (req.query.coommntid as string) || undefined;

  postDb.findOne({ _id: postId }, (err: any, data: any) => {
    if (err || !data) res.bad("somthing wrong happned");
    else {
      if (commentId) res.done(data.coments.id(commentId).likes);
      else res.done(data.likes);
    }
  });
};
