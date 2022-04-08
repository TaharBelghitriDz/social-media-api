import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/conduit")
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));
