import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktienUndEtfsComponent } from './aktien-und-etfs.component';

describe('AktienUndEtfsComponent', () => {
  let component: AktienUndEtfsComponent;
  let fixture: ComponentFixture<AktienUndEtfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AktienUndEtfsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AktienUndEtfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
