import { Publisher, OrderCancelledEvent, Subjects } from "@alanwkorganization/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}