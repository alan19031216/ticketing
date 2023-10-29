import { Publisher, Subjects, PaymentCreatedEvent } from "@alanwkorganization/common";

export class PaymentCreatedPublish extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}