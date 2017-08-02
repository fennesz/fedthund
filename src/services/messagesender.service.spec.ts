/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessagesenderService } from './messagesender.service';

describe('Service: Messagesender', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagesenderService]
    });
  });

  it('should ...', inject([MessagesenderService], (service: MessagesenderService) => {
    expect(service).toBeTruthy();
  }));
});