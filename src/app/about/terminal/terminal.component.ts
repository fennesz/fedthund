import { CommandhandlerService } from '../../../services/commandhandler.service';
import { Component } from '@angular/core';
import { Command } from "../../../library/models/command";

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
  providers: [CommandhandlerService]

})
export class TerminalComponent {

    private response: any;

    constructor(private commandHandler: CommandhandlerService) { }

    onCommand(event) {
        this.response = this.commandHandler.handleInput(event);
    }

}
