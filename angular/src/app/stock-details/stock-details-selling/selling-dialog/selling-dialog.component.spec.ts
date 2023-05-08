import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingDialogComponent } from './selling-dialog.component';

describe('SellingDialogComponent', () => {
  let component: SellingDialogComponent;
  let fixture: ComponentFixture<SellingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
