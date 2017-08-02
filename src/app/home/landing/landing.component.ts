import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [
    trigger('aboutButton', [
    state('inactive', style({
      transform: 'scale(0)'
    })),
    transition('void => active', [
      style({transform: 'scale(1)'}),
      animate(500)
    ])
  ]),
    trigger('appButton', [
    state('inactive', style({
      transform: 'scale(0)'
    })),
    transition('void => active', [
      style({transform: 'scale(1)'}),
      animate(500)
    ])
  ])
  ]
})
export class LandingComponent implements OnInit {

  aboutState: string = "inactive";
  appState: string = "inactive";

  constructor() { }

  ngOnInit() {
  }

  public toggleButtonAnimationState() {
      this.aboutState = "active";
      this.appState = "active"; 
  }

}
