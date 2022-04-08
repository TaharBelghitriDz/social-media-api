import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server running ");
});
