export class MessageDto {
    public subject: string;
    public mail: string;
    public content: string;
    public datetime: any;    

    public constructor(subject: string = "", mail: string = "", content: string = "") {
        this.subject = subject;
        this.mail = mail;
        this.content = content;
    }
}
