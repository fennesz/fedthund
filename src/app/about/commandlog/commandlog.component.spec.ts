/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommandlogComponent } from './commandlog.component';

describe('CommandlogComponent', () => {
  let component: CommandlogComponent;
  let fixture: ComponentFixture<CommandlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
