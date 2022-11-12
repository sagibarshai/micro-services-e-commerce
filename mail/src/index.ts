import express, { Request, Response } from "express";
import bodyParser from "body-parser";
const app = express();

app.set("trust proxy", true); //ingress-nginx is proxy so we allow for express app to trust proxy
app.use(bodyParser.json());
app.use(
     bodyParser.urlencoded({
          extended: true,
     })
);

app.get("/api/mail/test", (req: Request, res: Response) =>
     res.send("hey there mail srv")
);

app.listen(4002, () => {
     console.log("mail service is listenig on port 4002");
});
