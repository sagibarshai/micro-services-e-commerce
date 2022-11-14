import express from "express";
import bodyParser from "body-parser";
import { sendMailRouter } from "./routes/send-mail";
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

app.use(sendMailRouter);

app.listen(4002, () => {
     console.log("mail service is listenig on port 4002");
});
