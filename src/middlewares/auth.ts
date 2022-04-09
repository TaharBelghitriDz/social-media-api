import resHelper from "../utils/resHelper";
import { tokenVrfy } from "../utils/token";
import { validateEmail } from "../utils/validation";
import { RequestHandler } from "express";
import { userDb } from "../models/user";
import { IncomingHttpHeaders } from "http";
import { checkUserInterface } from "../interfaces/userInterface";

export const checkUser: RequestHandler = (req, resF, next) => {
  const res = resHelper(resF);
  let head: IncomingHttpHeaders & checkUserInterface = req.headers as any;

  //check email
  const checkEmail = validateEmail(head.email);
  if (!checkEmail) return res.bad("unvalid email");

  const token = head.token as string;

  userDb.FindUser({ email: head.email }, (err, user) => {
    const secretKey = process.env.SECRETKEY as string;

    if (err) res.bad("somthing went wrong");
    else if (!user) res.bad("unvalid user");
    else
      tokenVrfy(token, secretKey, (err, decode) => {
        if (err) res.bad("unvalid token");
        else {
          res.locals.user = user;
          next();
        }
      });
  });
};
