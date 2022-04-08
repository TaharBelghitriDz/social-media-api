import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/conduit")
  .then((data) => console.log("db connected"))
  .catch((err) => console.log(err));
