import mongoose, { Schema } from "mongoose";
import { userInterface, userInterfaceModel } from "../interfaces/dbInterface";

const userSchema: Schema<userInterface> = new mongoose.Schema<userInterface>({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  phoneNumber: String,
  bio: String,
  cover: String,
  follwing: [{ followId: String }],
  followers: [{ followId: String }],
  posts: [{ post: String }],
});

userSchema.pre<userInterface>("validate", function (this: userInterface, next) {
  this.password = "";
  this.bio = "";
  this.cover = "";
  this.cover = "";
  this.followers = [];
  this.followers = [];
  this.posts = [];
  next();
});

userSchema.statics.AddUser = (args: userInterface, clb: (err: any) => void) =>
  new userDb(args).save(clb);

export const userDb = mongoose.model<userInterface, userInterfaceModel>(
  "socialMediaApiUser",
  userSchema
);
