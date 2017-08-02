import { FirebaseService } from './firebase.service';
import { Message } from '../library/models/message';
import { Injectable } from '@angular/core';
import { MessageDto } from "../library/models/messageDto";

@Injectable()
export class MessagesenderService {

    constructor(private firebaseService: FirebaseService) { }

    public sendMessage(message: Message) {
        let messageDto = new MessageDto(message.subject, message.mail, message.content);
        this.firebaseService.saveMessage(messageDto);
    }

}