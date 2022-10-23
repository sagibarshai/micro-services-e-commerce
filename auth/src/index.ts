import { app } from "./app";
import mongoose from "mongoose";
if (!process.env.JWT_KEY) {
     throw new Error("JWT_KEY must be defined");
}
app.listen(4000, async () => {
     try {
          await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
          console.log("auth srv is listening on port 4000");
     } catch (err) {
          console.error(err);
          console.log("cannot connect to auth-mongo-srv");
     }
});
