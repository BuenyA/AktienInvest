import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetailsMetricsComponent } from './stock-details-metrics.component';

describe('StockDetailsMetricsComponent', () => {
  let component: StockDetailsMetricsComponent;
  let fixture: ComponentFixture<StockDetailsMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDetailsMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockDetailsMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
