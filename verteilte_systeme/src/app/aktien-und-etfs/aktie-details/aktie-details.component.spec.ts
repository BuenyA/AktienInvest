import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktieDetailsComponent } from './aktie-details.component';

describe('AktieDetailsComponent', () => {
  let component: AktieDetailsComponent;
  let fixture: ComponentFixture<AktieDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AktieDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AktieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
