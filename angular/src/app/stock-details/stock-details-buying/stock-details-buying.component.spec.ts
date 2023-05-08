import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetailsBuyingComponent } from './stock-details-buying.component';

describe('StockDetailsBuyingComponent', () => {
  let component: StockDetailsBuyingComponent;
  let fixture: ComponentFixture<StockDetailsBuyingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDetailsBuyingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockDetailsBuyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
