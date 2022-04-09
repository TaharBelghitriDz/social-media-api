import mongoose, { Schema, FilterQuery } from "mongoose";
import { userInterface, userInterfaceModel } from "../interfaces/dbInterface";
import { HashPassword } from "../utils/bcrypt";

const userSchema: Schema<userInterface> = new Schema<userInterface>({
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
  this.bio = "";
  this.cover = "";
  this.cover = "";
  this.followers = [];
  this.followers = [];
  this.posts = [];
  HashPassword(this.password, (err, hash) => {
    if (err) throw err;
    this.password = hash;
    next();
  });
});

userSchema.statics.AddUser = (
  args: userInterface,
  clb: (err: Error | null) => void
) => new userDb(args).save(clb);

userSchema.statics.FindUser = function (
  query: FilterQuery<userInterface>,
  clb: (err: Error | any, rslt: userInterface | null) => void
) {
  return this.findOne(query, clb);
};

export const userDb = mongoose.model<userInterface, userInterfaceModel>(
  "socialMediaApiUser",
  userSchema
);
