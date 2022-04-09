import resHelper from "utils/resHelper";
import { tokenVrfy } from "utils/token";
import { validateEmail } from "utils/validation";
import { RequestHandler } from "express";
import { userLogin } from "interfaces/userInterface";
import { userDb } from "models/user";

export const checkUser: RequestHandler = (req, resF, next) => {
  const res = resHelper(resF);
  let body: userLogin = req.body;

  //check email
  const checkEmail = validateEmail(body.email);
  if (!checkEmail) return res.bad("unvalid email");

  const token = req.headers.token as string;

  userDb.FindUser({ email: body.email }, (err, user) => {
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
