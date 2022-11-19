import mongoose from "mongoose";
import express, { Request, Response } from "express";
import { errorHandler } from "@planty-errors-handler/common";
import { addToFavoritesRoute } from "./routes/add-to-favorites";
import bodyParser from "body-parser";
const app = express();

app.set("trust proxy", true); //ingress-nginx is proxy so we allow for express app to trust proxy
app.use(bodyParser.json());
app.use(
     bodyParser.urlencoded({
          extended: true,
     })
);

if (!process.env.JWT_KEY) {
     throw new Error("JWT_KEY must be defined");
}

app.get("/api/favorites", (req: Request, res: Response) => {
     res.send("favorites service is ready");
});
app.use(addToFavoritesRoute);
app.use(errorHandler);

const start = async () => {
     try {
          await mongoose.connect(
               "mongodb://favorites-mongo-srv:27017/favorites"
          );
          app.listen(4003, () => {
               console.log("favorites srv is listening on port 4003");
          });
     } catch (err) {
          console.log(
               "cannot connect to mongodb://favorites-mongo-srv:27017/favorites "
          );
          console.log(err);
     }
};
start();
