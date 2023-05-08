import { TestBed } from '@angular/core/testing';

import { GetAccountDataService } from './get-account-data.service';

describe('GetAccountDataService', () => {
  let service: GetAccountDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAccountDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
