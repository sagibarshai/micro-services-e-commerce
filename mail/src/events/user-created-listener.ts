import nodemailer from "nodemailer";
import {
     Listener,
     Subjects,
     UserCreatedEvent,
} from "@planty-errors-handler/common";

import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
     subject: Subjects.UserCreated = Subjects.UserCreated;
     queueGroupName = queueGroupName;

     onMessage = async (data: UserCreatedEvent["data"], msg: Message) => {
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
               subject: `Hey ${data.name}, Thanks for signing up to planty!`,
               text: `Hey ${data.name}, we incorage you to look on out weeks seals, Enjoy shoping - planty.  `,
          };
          transporter.sendMail(options, (err: any, info: any) => {
               if (err) return console.log(err);
          });
     };
}
