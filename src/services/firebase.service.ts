import { MessageDto } from '../library/models/messageDto';
import { CommandDto } from '../library/models/commandDto';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase';
import { Injectable, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Command } from "../library/models/command";

@Injectable()
export class FirebaseService implements OnInit {

    private commandCount: number;
    private commandAmountRetrieved: number = 10;

    constructor(private db: AngularFireDatabase) { }

    public ngOnInit(): void {
    }

    public setCommandAmountRetreived(num: number) {
        this.commandAmountRetrieved = num;
    }

    public getCommandCount(): FirebaseObjectObservable<any> {
        return this.db.object('commandsMetadata');
    }

    public getCommandsByDateObservable(): FirebaseListObservable<Command[]> {
        return this.db.list('/commands', {
            query: {
                orderByChild: "datetime",
                preserveSnapshot: true,
                limitToLast: this.commandAmountRetrieved,
            }
        }) as FirebaseListObservable<Command[]>;
    }

    public saveCommand(msg: string) {
        var message = new CommandDto(msg, firebase.database.ServerValue.TIMESTAMP);
        this.db.database.ref('commands/' +  UUID.UUID()).set(message);
        this.db.object('commandsMetadata').$ref.ref.transaction(countObj => {
            if (countObj === null)
                return {commandcount: 1};
            else
                return {commandcount: countObj.commandcount + 1};
        });
    }

    public saveMessage(message: MessageDto) {
        message.datetime = firebase.database.ServerValue.TIMESTAMP;
        var uuid = UUID.UUID();
        this.db.database.ref('contactmessages/' + uuid).set(message);
        this.db.object('contactmessagesMetadata').$ref.ref.transaction(countObj => {
            if (countObj === null)
                return {messagecount: 1};
            else
                return {messagecount: countObj.messagecount + 1};
        });
    }
}