import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetailsHeaderComponent } from './stock-details-header.component';

describe('StockDetailsHeaderComponent', () => {
  let component: StockDetailsHeaderComponent;
  let fixture: ComponentFixture<StockDetailsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDetailsHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
