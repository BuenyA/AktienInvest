import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnTransactionsRawComponent } from './own-transactions-raw.component';

describe('OwnTransactionsRawComponent', () => {
  let component: OwnTransactionsRawComponent;
  let fixture: ComponentFixture<OwnTransactionsRawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnTransactionsRawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnTransactionsRawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
