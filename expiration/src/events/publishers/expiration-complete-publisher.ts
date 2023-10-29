import { ExpirationCompleteEvent, Subjects, Publisher } from "@alanwkorganization/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}