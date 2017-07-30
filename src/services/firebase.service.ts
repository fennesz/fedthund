import { CommandDto } from '../library/models/commandDto';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
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

    public saveCommand(command: string) {
        let comDto = new CommandDto(command, firebase.database.ServerValue.TIMESTAMP);
        this.db.database.ref('commands/' +  UUID.UUID()).set(comDto);
        this.db.object('commands/metadata').$ref.ref.transaction(countObj => {
            if (countObj === null)
                return {commandcount: 1};
            else
                return {commandcount: countObj.commandcount + 1};
        });
    }

    public setCommandAmountRetreived(num: number) {
        this.commandAmountRetrieved = num;
    }

    public getCommandCount(): FirebaseObjectObservable<any> {
        return this.db.object('commands/metadata');
    }

    public getCommands(): Command[] {
        let commands: Command[] = new Array<Command>();
        this.db.list('/commands', {
            query: {
                orderByChild: 'datetime'
            }
        }).subscribe(out => out.forEach(element => {
            commands.push(new Command(element.command, new Date(element.datetime)));
        }));
        return commands;
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
}