import { TestBed } from '@angular/core/testing';

import { StockPreviewDataService } from './stock-preview-data.service';

describe('StockPreviewDataService', () => {
  let service: StockPreviewDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockPreviewDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
