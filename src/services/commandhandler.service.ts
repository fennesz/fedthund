import { KeyedCollection } from '../library/implementations/keyedcollection';
import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CommandhandlerService {
    private possibleResponses: KeyedCollection<string> = new KeyedCollection<string>();

    constructor(private firebaseService: FirebaseService) {
        this.possibleResponses.Add('hello', 'Hi there, my name is Martin. I live with my fiance Charlotte, and my son Bastian in Aarhus, Denmark!');
        this.possibleResponses.Add('education', 'I am a CISCO certified IT technician, currently writing my bachelors thesis as a Software Engineer at Aarhus University');
        this.possibleResponses.Add('hobbies', 'I love to mess around with the latest technology, headless server management on my raspberry pi, linux, and website development. I also play the guitar!');
        this.possibleResponses.Add('birds', 'British Birds, or Danske Havefugle in Danish, is my most succesful app yet. It has over 10.000 unique downloads, and is used in classrooms accross europe as an educational tool.');
    }

    public handleInput(event): string
    {
        this.firebaseService.saveCommand(event.command, new Date());
        return this.fetchResponse(event.command);
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