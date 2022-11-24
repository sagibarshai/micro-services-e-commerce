import {
     Publisher,
     Subjects,
     PaymentCreatedEvent,
} from "@planty-errors-handler/common";
export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
     subject: Subjects.PaymentSuccsess = Subjects.PaymentSuccsess;
}
