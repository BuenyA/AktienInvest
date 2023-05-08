import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAccountAendernComponent } from './dialog-account-aendern.component';

describe('DialogAccountAendernComponent', () => {
  let component: DialogAccountAendernComponent;
  let fixture: ComponentFixture<DialogAccountAendernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAccountAendernComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAccountAendernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
