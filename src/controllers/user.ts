import { RequestHandler } from "express";
import { FilterQuery } from "mongoose";
import { userInterface } from "../interfaces/dbInterface";
import { userLogin, userSignUp } from "../interfaces/userInterface";
import { userDb } from "../models/user";
import { HashPassword } from "../utils/bcrypt";
import resHelper from "../utils/resHelper";
import { tokenSign, tokenVrfy } from "../utils/token";
import { validateEmail } from "../utils/validation";

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
      HashPassword(body.password, (err, hash) => {
        if (err) res.bad("somthing bad happned");
        else {
          const userData: any = { ...body, password: hash };
          delete userData.checkPassword;
          userDb.AddUser(userData, (err) => {
            if (err) res.bad("somthing went wrong");
            else {
              const secretKey = process.env.SECRETKEY as string;
              tokenSign({
                str: body.email,
                key: secretKey,
                clb(err: any, token: any) {
                  if (err) res.bad("somthing went wrong pleas try again");
                  else res.done(token);
                },
              });
            }
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
      tokenSign({
        str: body.email,
        key: secretKey,
        clb(err: any, token: any) {
          if (err) res.bad("somthing went wrong pleas try again");
          else res.done(token);
        },
      });
  });
};

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
