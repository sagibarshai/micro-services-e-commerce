import { app } from "./app";
import mongoose from "mongoose";
import { natsWrapper } from "@planty-errors-handler/common";
import { randomBytes } from "crypto";

if (!process.env.JWT_KEY) {
     throw new Error("JWT_KEY must be defined");
}

const start = async () => {
     try {
          await natsWrapper.connect(
               "planty",
               randomBytes(4).toString("hex"),
               "http://nats-streaming-srv:4222"
          );
          natsWrapper.client.on("close", () => {
               console.log("NATS conneection is off");
               process.exit();
          });
          natsWrapper.client.on("SIGINT", () => natsWrapper.client.close());
          natsWrapper.client.on("SIGTERM", () => natsWrapper.client.close());
          await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
          app.listen(4000, () => {
               console.log("auth srv is listening on port 4000");
          });
     } catch (err) {
          console.log("cannot connect to mongodb://auth-mongo-srv:27017/auth ");
          console.log(err);
     }
};
start();
