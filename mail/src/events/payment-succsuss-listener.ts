import {
     Listener,
     PaymentCreatedEvent,
     Subjects,
} from "@planty-errors-handler/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import nodemailer from "nodemailer";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
     subject: Subjects.PaymentSuccsess = Subjects.PaymentSuccsess;
     queueGroupName = queueGroupName;
     onMessage = async (data: PaymentCreatedEvent["data"], msg: Message) => {
          msg.ack();
          const transporter = nodemailer.createTransport({
               service: "hotmail",
               auth: {
                    user: "planty-shop@outlook.com",
                    pass: process.env.EMAIL_SERVICE_PASSWORD!,
               },
          });

          const options = {
               from: "planty-shop@outlook.com",
               to: data.email,
               subject: `Hey ${data.name}, Your purchase has been approved `,
               text: `Hey ${data.name}, Thank you for choosing Planty!.  `,
          };
          transporter.sendMail(options, (err: any, info: any) => {
               if (err) return console.log(err);
          });
     };
}
