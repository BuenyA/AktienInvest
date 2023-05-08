import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingDialogComponent } from './buying-dialog.component';

describe('BuyingDialogComponent', () => {
  let component: BuyingDialogComponent;
  let fixture: ComponentFixture<BuyingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
