import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktienChartComponent } from './aktien-chart.component';

describe('AktienChartComponent', () => {
  let component: AktienChartComponent;
  let fixture: ComponentFixture<AktienChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AktienChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AktienChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
