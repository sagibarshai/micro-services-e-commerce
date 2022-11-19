import mongoose from "mongoose";
import express, { Request, Response } from "express";

const app = express();

if (!process.env.JWT_KEY) {
     throw new Error("JWT_KEY must be defined");
}
if (!process.env.STRIPE_KEY) {
     console.log(process.env);
     throw new Error("STRIPE_KEY must be defined");
}

app.get("/api/payments", (req: Request, res: Response) => {
     res.send("payments service is ready");
});

const start = async () => {
     try {
          await mongoose.connect("mongodb://payments-mongo-srv:27017/payments");
          app.listen(4004, () => {
               console.log("payments srv is listening on port 4004");
          });
     } catch (err) {
          console.log(
               "cannot connect to mongodb://payments-mongo-srv:27017/payments "
          );
          console.log(err);
     }
};
start();
