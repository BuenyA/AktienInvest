import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountdatenAendernComponent } from './accountdaten-aendern.component';

describe('AccountdatenAendernComponent', () => {
  let component: AccountdatenAendernComponent;
  let fixture: ComponentFixture<AccountdatenAendernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountdatenAendernComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountdatenAendernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
