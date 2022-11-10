import express from "express";
import { addToCartRoute } from "./routes/add-to-cart";
import { errorHandler } from "@planty-errors-handler/common";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { getCartRoute } from "./routes/get-cart";
import { decreseFromCartRoute } from "./routes/decrese-from-cart";
import { removeFromCartRoute } from "./routes/remove-from-cart";
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
app.use(addToCartRoute);
app.use(getCartRoute);
app.use(decreseFromCartRoute);
app.use(removeFromCartRoute);

app.use(errorHandler);
const start = async () => {
     try {
          await mongoose.connect("mongodb://cart-mongo-srv:27017/cart");
          app.listen(4001, () => {
               console.log("cart srv is listening on port 4001");
          });
     } catch (err) {
          console.log("cannot connect to mongodb://cart-mongo-srv:27017/cart ");
          console.log(err);
     }
};
start();
