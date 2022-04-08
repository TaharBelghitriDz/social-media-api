import mongoose from "mongoose";
import { userInterface } from "./interfaces/dbInterface";

mongoose
  .connect("mongodb://localhost/conduit")
  .then((data) => console.log("db connected"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema<userInterface>({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  bio: String,
  cover: String,
  follwing: [{ followId: String }],
  followers: [{ followId: String }],
  posts: [{ post: String }],
});

const user = mongoose.model<userInterface>("socialMediaApiUser", userSchema);
export default user;
