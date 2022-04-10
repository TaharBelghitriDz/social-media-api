import { RequestHandler } from "express";
import { postDb } from "../models/posts";
import resHelper from "../utils/resHelper";

export const addComment: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const body: { content: string; postId: string } = req.body;

  postDb
    .findPost([{ _id: body.postId }])
    .then((post) => {
      if (!post) throw { err: "we couldn't post comment" };

      post.coments.push({
        userId: res.locals.user._id,
        content: body.content,
        likes: [],
      });
      post.save((err) => {
        if (err) throw { err: "somthing wrong while posting " };
        res.done("posted");
      });
    })
    .catch((err) => {
      if (err.err) res.bad(err.err);
      else res.bad("somthing wrong happned pleas try again");
    });
};

export const editComment: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const body: { content: string; postId: string } = req.body;
  const id = req.headers.id;

  if (id) {
    const editQuery = {
      userId: res.locals.user._id,
      postId: body.postId,
      newContent: body.content,
    };
    postDb.editComment(editQuery, (err, data) => {
      if (err) res.bad("somthing wrong happned ");
      else if (!data) res.bad("unvalid commnet");
      else res.done("posted");
    });
  } else res.bad("somthing went wrong");
};

export const removeCommnet: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const postId = req.query.postid;
  const commentId = req.query.commentid;

  if (!postId && !commentId)
    res.bad("somthing went wrong pleas refresh the page");
  else {
    const removeQuery: any = {
      userId: `${res.locals.user._id}`,
      postId,
      commentId,
    };

    postDb.removeCommnet(removeQuery, (err) => {
      if (err) res.bad("somthing wrong happend");
      else res.done("romeved");
    });
  }
};

export const findCommnets: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const postId = req.query.postid;
  const range = req.query.range || 0;
  if (postId)
    postDb
      .find({ _id: postId })
      .skip(range as number)
      .limit(10)
      .exec((err, data: any) => {
        if (err) res.bad("somthing wrong happned");
        else if (!data) res.bad("no comments");
        else res.done(data);
      });
  else res.bad("somthingwrong happned");
};
