import { Listener } from "./base-listener";
import { Message } from "node-nats-streaming";
import { UserCreatedEvent } from "./user-created-event";
import { Subjects } from "./subjects";
export class UserCreatedListener extends Listener<UserCreatedEvent> {
     subject: Subjects.UserCreated = Subjects.UserCreated;
     queueGroupName = "auth-service";

     onMessage(data: UserCreatedEvent["data"], msg: Message) {
          console.log(`event data! ${data}`);
          msg.ack();
     }
}
