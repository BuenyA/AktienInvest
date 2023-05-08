import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktienPreviewComponent } from './aktien-preview.component';

describe('AktienPreviewComponent', () => {
  let component: AktienPreviewComponent;
  let fixture: ComponentFixture<AktienPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AktienPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AktienPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
