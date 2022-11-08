import { app } from "./app";
import mongoose from "mongoose";
if (!process.env.JWT_KEY) {
     throw new Error("JWT_KEY must be defined");
}
const start = async () => {
     try {
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
