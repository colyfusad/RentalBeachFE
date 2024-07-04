import { TestBed } from '@angular/core/testing';

import { BrowserEventService } from './browser-event.service';

describe('BrowserEventService', () => {
  let service: BrowserEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
