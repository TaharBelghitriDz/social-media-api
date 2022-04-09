import { RequestHandler } from "express";
import { newPostInterface } from "interfaces/postsInterdace";
import { postDb } from "../models/posts";
import resHelper from "../utils/resHelper";

//post
export const addPost: RequestHandler = (req, resF) => {
  const res = resHelper(resF);

  const body: newPostInterface = req.body;

  const addPost: any = {
    ...body,
    userId: res.locals.user._id as string,
    cover: body.cover.split(" "),
  };

  postDb.addPost(addPost, (err) => {
    if (err) res.bad("somthing went wrong pleas try again");
    else res.done("post added");
  });
};

export const editPost: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const body: newPostInterface = req.body;
  const id = req.headers.id;
  const addPost: any = {
    ...body,
    userId: res.locals.user._id as string,
    cover: body.cover.split(" "),
  };

  if (id)
    postDb.editPost({ _id: id }, addPost, (err, rslt) => {
      if (err) res.bad("somthing went wrong pleas try again");
      else if (!rslt) res.bad("unvalid post ");
      else res.done("updated");
    });
  else res.bad("unvalid post id");
};

export const removePost: RequestHandler = (req, resF) => {
  const res = resHelper(resF);

  const id = req.query.id;

  if (id)
    postDb
      .removePost([{ _id: id }])
      .then((data) => {
        if (data) res.done("post removed");
        else res.bad("unvalid post");
      })
      .catch(() => res.bad("somthing wrong happned pleas try again"));
  else res.bad("unvalid post id");
};
export const findPost: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const id = req.query.id;

  postDb
    .findPost([id ? { _id: id } : {}])
    .then((data) => {
      if (data) res.done(data);
      else res.bad("we didn't found any post");
    })
    .catch(() => res.bad("somthing wrong happned pleas try again"));
};

// comments

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

export const findCommnets: RequestHandler = (req, resF, next) => {
  const res = resHelper(resF);
  const postId = req.query.postid;
  const range = req.query.range;
  if (postId && range) {
    postDb.find({ _id: res.locals.user._id });
  } else next();
};

export const addLike: RequestHandler = (req, resF) => {};
export const updateLike: RequestHandler = (req, resF) => {};
export const findLikes: RequestHandler = (req, resF) => {};
