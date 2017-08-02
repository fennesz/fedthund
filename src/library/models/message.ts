import { FormGroup } from '@angular/forms';
export class Message {
    public subject: string;
    public mail: string;
    public content: string;

    public constructor(subject: string = "", mail: string = "", content: string = "") {
        this.subject = subject;
        this.mail = mail;
        this.content = content;
    }

    public mapValuesFrom(form: FormGroup) {
        this.subject = form.get('subject').value;
        this.mail = form.get('email').value;
        this.content = form.get('content').value;
    }
}
