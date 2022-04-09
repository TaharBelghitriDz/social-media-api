import { RequestHandler } from "express";
import { newPostInterface } from "interfaces/postsInterdace";
import { postDb } from "models/posts";
import resHelper from "utils/resHelper";

//post
export const addPost: RequestHandler = (req, resF) => {
  const res = resHelper(resF);

  const body: newPostInterface = req.body;

  const addPost: any = { ...body, userId: res.locals.user._id as string };

  postDb.addPost(addPost, (err) => {
    if (err) res.bad("somthing went wrong pleas try again");
    else res.done("post added");
  });
};

export const editPost: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const body: newPostInterface = req.body;

  const addPost: any = { ...body, userId: res.locals.user._id as string };

  postDb.addPost(addPost, (err) => {
    if (err) res.bad("somthing went wrong pleas try again");
    else res.done("post added");
  });
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

export const addComment: RequestHandler = (req, resF) => {};
export const editComment: RequestHandler = (req, resF) => {};
export const removeCommnet: RequestHandler = (req, resF) => {};
export const findCommnets: RequestHandler = (req, resF) => {};

export const addLike: RequestHandler = (req, resF) => {};
export const updateLike: RequestHandler = (req, resF) => {};
export const findLikes: RequestHandler = (req, resF) => {};
