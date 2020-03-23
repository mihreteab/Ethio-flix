import mongoose from "mongoose";
import { mongo } from "../config/config";
import chalk from "chalk";

mongoose.Promise = Promise;

export default async function connectDatabase() {
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useUnifiedTopology", true);
  await mongoose.connect(
    `mongodb://${mongo.addr}:${mongo.port}/${mongo.db_name}`
  );
  mongoose.connection.on("error", err => {
    console.error(err);
    console.log(
      `${chalk.red(
        "✗"
      )} MongoDB connection error. Please make sure MongoDB is running.`
    );
    process.exit();
  });

  mongoose.connection.on("connected", () => {
    console.log("Connection Established");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("Connection Reestablished");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Connection Disconnected");
  });

  mongoose.connection.on("close", () => {
    console.log("Connection Closed");
  });
}
