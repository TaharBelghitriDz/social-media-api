import app from "./src";
import cluster from "cluster";
import process from "process";
import os from "os";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });

const cpus = os.cpus;
const numCPUs = cpus().length;

if (cluster.isPrimary) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log("server running on port " + PORT);
  });
}
