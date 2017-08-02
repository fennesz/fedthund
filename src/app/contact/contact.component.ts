import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { MessagesenderService } from '../../services/messagesender.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../library/models/message';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  message: Message;
  contactForm: FormGroup;
  contentCharacterLimit: number = 60;
  modalOptions: NgbModalOptions;

  constructor(private modalService: NgbModal, private messageService: MessagesenderService) {}

  ngOnInit() {
    let subjectForm = new FormControl('', Validators.required);
    let emailForm = new FormControl('', [Validators.required, Validators.email]);
    let contentForm = new FormControl('', [Validators.required, Validators.minLength(this.contentCharacterLimit)]);
    this.contactForm = new FormGroup({
      subject: subjectForm,
      email: emailForm,
      content: contentForm,
    });
    this.modalOptions = {backdrop: "static", keyboard: false}
  }

    open(content) {
    this.message = new Message();
    this.contactForm.reset();
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      /*On send:*/
      this.message.mapValuesFrom(this.contactForm);
      this.messageService.sendMessage(this.message);
    }, (response) => {/*On close: Do nothing*/});
  }

  validateSubject() {
    return this.contactForm.controls.subject.valid || this.contactForm.controls.subject.untouched;
  }

  validateEmail() {
    return this.contactForm.controls.email.valid || this.contactForm.controls.email.untouched;
  }

  validateContent() {
    return this.contactForm.controls.content.valid || this.contactForm.controls.content.untouched;
  }

}
