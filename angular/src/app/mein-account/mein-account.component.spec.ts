import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeinAccountComponent } from './mein-account.component';

describe('MeinAccountComponent', () => {
  let component: MeinAccountComponent;
  let fixture: ComponentFixture<MeinAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeinAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeinAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
