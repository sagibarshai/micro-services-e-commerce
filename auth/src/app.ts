import nats, { Stan, Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
import express from "express";
import bodyParser from "body-parser";
import signupRouter from "./routes/signup";
import signinRouter from "./routes/signin";
import signoutRouter from "./routes/signout";
import currentuserRouter from "./routes/current-user";
import { errorHandler } from "@planty-errors-handler/common";

const app = express();

app.set("trust proxy", true); //ingress-nginx is proxy so we allow for express app to trust proxy
app.use(bodyParser.json());
app.use(
     bodyParser.urlencoded({
          extended: true,
     })
);

const stan: Stan = nats.connect("planty", randomBytes(4).toString("hex"), {
     url: "http://nats-streaming-srv:4222",
});
stan.on("connect", () => {
     console.log("auth publisher is connected");
});

app.use(signupRouter);
app.use(currentuserRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.use(errorHandler);
export { app };
