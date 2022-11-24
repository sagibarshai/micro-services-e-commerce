import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import { errorHandler } from "@planty-errors-handler/common";
import { ChargeRoute } from "./routes/charge";
import { natsWrapper } from "@planty-errors-handler/common";
import { randomBytes } from "crypto";

const app = express();

app.set("trust proxy", true); //ingress-nginx is proxy so we allow for express app to trust proxy
app.use(bodyParser.json());
app.use(
     bodyParser.urlencoded({
          extended: false,
     })
);
if (!process.env.JWT_KEY) {
     throw new Error("JWT_KEY must be defined");
}
if (!process.env.STRIPE_KEY) {
     throw new Error("STRIPE_KEY must be defined");
}

app.use(ChargeRoute);

app.use(errorHandler);
const start = async () => {
     try {
          await natsWrapper.connect(
               "planty",
               randomBytes(4).toString("hex"),
               "http://nats-streaming-srv:4222"
          );
          natsWrapper.client.on("SIGINT", () => natsWrapper.client.close());
          natsWrapper.client.on("SIGTERM", () => natsWrapper.client.close());
          console.log("payments is connected to nats");
          await mongoose.connect("mongodb://payments-mongo-srv:27017/payments");
          app.listen(4004, () => {
               console.log("payments srv is listening on port 4004");
          });
     } catch (err) {
          console.log(
               "cannot connect to mongodb://payments-mongo-srv:27017/payments "
          );
          console.log(err);
     }
};
start();
