import { Publisher, Subjects, TicketUpdatedEvent } from "@alanwkorganization/common";

export class TicketUpdatedPublish extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}