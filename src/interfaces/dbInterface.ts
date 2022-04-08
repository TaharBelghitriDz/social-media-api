import { Model, Document } from "mongoose";

export interface userInterface extends Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber?: string;
  bio?: string;
  cover?: string;
  follwing?: { followId: string }[];
  followers?: { followId: string }[];
  posts?: { postId: string }[];
}
export interface userInterfaceModel extends Model<userInterface> {
  AddUser: (args: userInterface, clb: (err: any) => void) => void;
}
