import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';

@Injectable()
export class FirebaseService implements OnInit {

    constructor(private db: AngularFireDatabase) { }

    public ngOnInit(): void {
    }

    public saveCommand(command: string, date: Date) {
        var guid: string = UUID.UUID();
        this.db.database.ref('commands/' + guid).set({
            datetime: JSON.stringify(date),
            command: command,
        })
    }
}