import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartpageHeaderComponent } from './startpage-header.component';

describe('StartpageHeaderComponent', () => {
  let component: StartpageHeaderComponent;
  let fixture: ComponentFixture<StartpageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartpageHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartpageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
