import { Publisher, OrderCreatedEvent, Subjects } from "@alanwkorganization/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}