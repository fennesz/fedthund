import { CommandhandlerService } from '../../../services/commandhandler.service';
import { Component, OnInit } from '@angular/core';
import { Command } from "../../../library/models/command";
import { DatePipe } from '@angular/common';
import { FirebaseListObservable } from "angularfire2/database";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-commandlog',
  templateUrl: './commandlog.component.html',
  styleUrls: ['./commandlog.component.css'],
  providers: [CommandhandlerService]
})
export class CommandlogComponent implements OnInit {
  public response;
  public commandList: FirebaseListObservable<Command[]>;
  public amountShown: any = 5;
  public allLoaded: any = false;

  constructor(private commandHandler: CommandhandlerService) { }

    public ngOnInit(): void {
      this.commandHandler.setCommandAmountRetreived(this.amountShown);
      this.commandList = this.commandHandler.getCommandObservable();
    }

    private loadMore() {
      this.amountShown += 5;
      this.commandHandler.setCommandAmountRetreived(this.amountShown);
      this.commandList = this.commandHandler.getCommandObservable();
      let count: number = this.commandHandler.getCommandCount();
      if (this.amountShown > count)
        this.allLoaded = true;
    }

}
