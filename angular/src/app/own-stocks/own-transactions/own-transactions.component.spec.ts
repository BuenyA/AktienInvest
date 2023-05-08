import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnTransactionsComponent } from './own-transactions.component';

describe('OwnTransactionsComponent', () => {
  let component: OwnTransactionsComponent;
  let fixture: ComponentFixture<OwnTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
