import cookieSession from "cookie-session";
import express from "express";
import bodyParser from "body-parser";
import signupRouter from "./routes/signup";
import signinRouter from "./routes/signin";
import signoutRouter from "./routes/signout";
import currentuserRouter from "./routes/current-user";
import { errorHandler } from "./middlewears/error-handler";
import mongoose from "mongoose";
const app = express();

app.set("trust proxy", true); //ingress-nginx is proxy so we allow for express app to trust proxy
app.use(bodyParser.json());
app.use(
     bodyParser.urlencoded({
          extended: true,
     })
);
app.use(signupRouter);
app.use(currentuserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(
     cookieSession({
          secure: true, //https only
          signed: false, //disable increpted on cookie
     })
);

if (!process.env.JWT_KEY) {
     throw new Error("JWT_KEY must be defined");
}

app.use(errorHandler);

app.listen(4000, async () => {
     try {
          await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
          console.log("auth srv is listening on port 4000");
     } catch (err) {
          console.error(err);
          console.log("cannot connect to auth-mongo-srv");
     }
});
