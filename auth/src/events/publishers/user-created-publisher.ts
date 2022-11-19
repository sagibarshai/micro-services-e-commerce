import {
     Publisher,
     Subjects,
     UserCreatedEvent,
} from "@planty-errors-handler/common";
export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
     subject: Subjects.UserCreated = Subjects.UserCreated;
}
