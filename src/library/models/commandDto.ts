export class CommandDto {
    command: string;
    datetime: Object;

    public constructor(command: string,datetime: Object) {
        this.command = command;
        this.datetime = datetime;
    }
}
