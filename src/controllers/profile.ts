import { RequestHandler } from "express";
import { userInterface } from "../interfaces/dbInterface";
import { userDb } from "../models/user";
import resHelper from "../utils/resHelper";

export const profileEdit: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const _id = res.locals.id;
  const bio = req.body.bio;
  const cover = req.body.cover;
  const name = req.body.name;

  // don't forget to check values first

  if (bio || cover || name)
    userDb.FindUser({ _id }, (err: Error | any, data: userInterface | any) => {
      if (err || !data) res.bad("somthing bad happned");
      else {
        if (bio) data.bio = bio;
        else if (cover) data.cover = cover;
        else if (name) {
          data.firstName = name.split(",")[0];
          data.lastName = name.split(",")[1];
        }

        data.save((err: any) => {
          if (err) res.bad("somthing bad happned");
          else res.done("posted");
        });
      }
    });
  else res.bad("somthing bad happned");
};

export const profileFollow: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const _id = res.locals.id as string;
  const otherId = req.body.otherId as string;

  userDb.FindUser({ _id }, (myerr, myuser: any) => {
    userDb.FindUser({ _id: otherId }, (othererr, otheruser: any) => {
      if (myerr || othererr || myuser)
        res.bad("somthing went wrong please try again");
      else if (!otheruser) res.bad("unvalid user");
      else {
        const clb = (err: any) => {
          if (err) res.bad("somthingwrong happned");
          else res.done("followed");
        };
        myuser.follwing.push({ followId: otheruser._id });
        otheruser.followers.push({ followId: _id });
        myuser.save(clb);
      }
    });
  });
};
