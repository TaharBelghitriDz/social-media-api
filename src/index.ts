import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { notFoundError, reqErrHandler } from "./middlewares/reqErorHandler";
import "./config/db.config";
import routs from "./routs/index";
import { postDb } from "./models/posts";

dotenv.config({ path: __dirname + "/.env" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: 100 }));
app.use(cors());
app.use(helmet());
app.use("/v1", routs);

const PORT = process.env.PORT || 5000;

app.use(notFoundError);
app.use(reqErrHandler);

const ff = {
  userId: "625197a8dd7592903d846b19",
  postId: "6251b975186ef7c987b3b7b8",
  commentId: "625197a8dd7592903d846b19",
};
// search for mongoose notification
postDb.findOne(
  { _id: "6251b975186ef7c987b3b7b8" },

  (err: any, data: any) => {
    console.log("here");
    console.log(err);
    console.log(data);
    if (data) data.coments.pull({ _id: "6251de64f1091a8dc507630d" });
    data.save((err: any) => {
      if (err) console.log("err save " + err);
      else console.log("removed");
    });
  }
);

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
