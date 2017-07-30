export class Command {
    command: string;
    datetime: Date;

    public constructor(command: string, datetime: Date) {
        this.command = command;
        this.datetime = datetime;
    }
}
