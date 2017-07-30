import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { Command } from '../library/models/command';
import { KeyedCollection } from '../library/implementations/keyedcollection';
import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import { FirebaseObjectObservable } from "angularfire2/database";

@Injectable()
export class CommandhandlerService {
    private possibleResponses: KeyedCollection<string> = new KeyedCollection<string>();

    constructor(private firebaseService: FirebaseService) {
        this.possibleResponses.Add('hello', 'Hi there, my name is Martin. I live with my fiance Charlotte, and my son Bastian in Aarhus, Denmark!');
        this.possibleResponses.Add('education', 'I am a CISCO certified IT technician, currently writing my bachelors thesis as a Software Engineer at Aarhus University');
        this.possibleResponses.Add('hobbies', 'I love to mess around with the latest technology, headless server management on my raspberry pi, linux, and website development. I also play the guitar!');
        this.possibleResponses.Add('birds', 'British Birds, or Danske Havefugle in Danish, is my most succesful app yet. It has over 10.000 unique downloads, and is used in classrooms accross europe as an educational tool.');
    }

    public setCommandAmountRetreived(num: number) {
        this.firebaseService.setCommandAmountRetreived(num);
    }

    public handleInput(event): string
    {
        this.firebaseService.saveCommand(event.command);
        return this.fetchResponse(event.command);
    }

    public getAllCommands(): Command[] {
        return this.firebaseService.getCommands();
    }

    public getCommandObservable(): FirebaseListObservable<Command[]> {
        return this.firebaseService.getCommandsByDateObservable();
    }

    public getCommandCount(): number {
        let retNum: number;
        this.firebaseService.getCommandCount().subscribe(countObj => retNum = countObj.commandcount);
        return retNum;
    }

    private fetchResponse(command: string): string {
        command = command.toLowerCase();
        if (command.indexOf('help') !== -1) {
            return this.printHelp();
        }
        if (this.possibleResponses.ContainsKey(command)) {
            return this.possibleResponses.Item(command);
        }
        return "Invalid command: " + command +  ". Type 'help'";
    }

    private printHelp(): string {
        var returnString: string = "The following commands are available: ";
        var keys: string[] = this.possibleResponses.Keys();
        keys.forEach(key => {
            returnString = returnString + key + ", ";
        });
        return returnString.substring(0, returnString.length - 2);
    }

}