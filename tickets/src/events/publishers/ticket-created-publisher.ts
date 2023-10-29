import { Publisher, Subjects, TicketCreatedEvent } from "@alanwkorganization/common";

export class TicketCreatedPublish extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated
}