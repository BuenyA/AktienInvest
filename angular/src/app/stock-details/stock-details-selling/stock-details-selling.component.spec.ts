import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetailsSellingComponent } from './stock-details-selling.component';

describe('StockDetailsSellingComponent', () => {
  let component: StockDetailsSellingComponent;
  let fixture: ComponentFixture<StockDetailsSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDetailsSellingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockDetailsSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
