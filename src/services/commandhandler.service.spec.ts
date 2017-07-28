/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommandhandlerService } from './commandhandler.service';

describe('Service: Commandhandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandhandlerService]
    });
  });

  it('should ...', inject([CommandhandlerService], (service: CommandhandlerService) => {
    expect(service).toBeTruthy();
  }));
});