import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnStocksComponent } from './own-stocks.component';

describe('OwnStocksComponent', () => {
  let component: OwnStocksComponent;
  let fixture: ComponentFixture<OwnStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnStocksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
