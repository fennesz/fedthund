import { CommandhandlerService } from '../../../services/commandhandler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
  providers: [CommandhandlerService],
})
export class TerminalComponent implements OnInit {
  response: string;

  constructor(private commandHandler: CommandhandlerService) { }

  ngOnInit() {
  }

    onCommand(event) {
        this.response = this.commandHandler.handleInput(event);
    }
}
