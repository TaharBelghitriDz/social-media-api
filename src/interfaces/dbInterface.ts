import { Model, Document, FilterQuery } from "mongoose";

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
  AddUser: (args: userInterface, clb: (err: Error | null) => void) => void;
  FindUser: (
    query: FilterQuery<userInterface>,
    clb: (err: Error | any, rslt: userInterface | null) => void
  ) => void;
}
