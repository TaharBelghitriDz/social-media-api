import { userDb } from "../models/user";
import { comparePassword } from "../utils/bcrypt";
import resHelper from "../utils/resHelper";
import { tokenSign } from "../utils/token";
import { validateEmail } from "../utils/validation";
import { RequestHandler } from "express";
import { userInterface } from "interfaces/dbInterface";
import { userLogin, userSignUp } from "interfaces/userInterface";
import { FilterQuery } from "mongoose";

export const signUp: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  let body: userSignUp = req.body;

  //check email
  const checkEmail = validateEmail(body.email);
  if (!checkEmail) return res.bad("unvalid email");

  // check password
  if (body.password !== body.checkPassword)
    return res.bad("check your password ");

  const userSearchQuery: FilterQuery<userInterface> = {
    $or: [
      {
        firstName: body.firstName,
      },
      { email: body.email },
    ],
  };

  const clb = (err: Error | null, user: userInterface | null) => {
    if (err) res.bad("somoething went wrong pleas try again");
    else if (user) {
      if (body.lastName === user.lastName && body.firstName === user.firstName)
        res.bad("unvalid name");
    } else {
      const userData: any = { ...body };

      delete userData.checkPassword;
      userDb.AddUser(userData, (err) => {
        if (err) res.bad("somthing went wrong");
        else {
          const secretKey = process.env.SECRETKEY as string;
          tokenSign({
            str: body.email,
            key: secretKey,
            clb(err: any, token: any) {
              if (err) res.bad("login");
              else res.done(token);
            },
          });
        }
      });
    }
  };

  userDb.FindUser(userSearchQuery, clb);
};

// express boilerbat

export const login: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  let body: userLogin = req.body;

  //check email
  const checkEmail = validateEmail(body.email);
  if (!checkEmail) return res.bad("unvalid email");

  userDb.FindUser({ email: body.email }, (err, user) => {
    const secretKey = process.env.SECRETKEY as string;

    if (err) res.bad("somthing went wrong");
    else if (!user) res.bad("unvalid user");
    else
      comparePassword(body.password, user.password, (err, rslt) => {
        if (err || !rslt) res.bad("unvalid password");
        else if (!err && rslt)
          tokenSign({
            str: body.email,
            key: secretKey,
            clb(err: any, token: any) {
              if (err) res.bad("somthing went wrong pleas try again");
              else res.done(token);
            },
          });
      });
  });
};
