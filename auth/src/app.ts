import express from "express";
import bodyParser from "body-parser";
import signupRouter from "./routes/signup";
import signinRouter from "./routes/signin";
import signoutRouter from "./routes/signout";
import currentuserRouter from "./routes/current-user";
import { errorHandler } from "./middlewears/error-handler";

const app = express();

app.set("trust proxy", true); //ingress-nginx is proxy so we allow for express app to trust proxy
app.use(bodyParser.json());
app.use(
     bodyParser.urlencoded({
          extended: true,
     })
);
console.log(process.env.GOOGLE_CLIENT_SECRET!, process.env.GOOGLE_CLIENT_ID);

app.use(signupRouter);
app.use(currentuserRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.use(errorHandler);
export { app };
