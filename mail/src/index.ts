import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import { natsWrapper } from "@planty-errors-handler/common/build/NATS/nats-wrapper";
import { UserCreatedListener } from "./events/user-created-listener";

const app = express();

app.set("trust proxy", true); //ingress-nginx is proxy so we allow for express app to trust proxy
app.use(bodyParser.json());
app.use(
     bodyParser.urlencoded({
          extended: true,
     })
);

if (!process.env.EMAIL_SERVICE_PASSWORD) {
     throw new Error("EMAIL_SERVICE_PASSWORD must be defined");
}

const start = async () => {
     try {
          await natsWrapper.connect(
               "planty",
               randomBytes(4).toString("hex"),
               "http://nats-streaming-srv:4222"
          );
          app.listen(4002, () => {
               console.log("mail service is listenig on port 4002");
          });
          natsWrapper.client.on("close", () => {
               console.log("NATS conneection is off");
               process.exit();
          });
          natsWrapper.client.on("SIGINT", () => natsWrapper.client.close());
          natsWrapper.client.on("SIGTERM", () => natsWrapper.client.close());
          new UserCreatedListener(natsWrapper.client).listen();
     } catch (err) {
          console.log(err);
     }
};
start();
