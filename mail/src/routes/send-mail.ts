import nodemailer from "nodemailer";
import express, { Request, Response } from "express";

const router = express.Router();
router.get("/api/mail", (req: Request, res: Response) => {
     const transporter = nodemailer.createTransport({
          service: "hotmail",
          auth: {
               user: "planty-shop@outlook.com",
               pass: process.env.EMAIL_SERVICE_PASSWORD!,
          },
     });

     const options = {
          from: "planty-shop@outlook.com",
          to: "sagibarshai1@gmail.com",
          subject: "Hey shelly, planty-shop is starting new business",
          text: "Hey shelly, this is a test mail from your lover (Sagi), if you reciving this mail please let me know my love.",
     };
     transporter.sendMail(options, (err: any, info: any) => {
          if (err) return console.log(err);
          res.send(info.response);
     });
});
export { router as sendMailRouter };
