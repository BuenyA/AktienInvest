import { TestBed } from '@angular/core/testing';

import { MultiplayerAccountDataService } from './multiplayer-account-data.service';

describe('MultiplayerAccountDataService', () => {
  let service: MultiplayerAccountDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiplayerAccountDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
