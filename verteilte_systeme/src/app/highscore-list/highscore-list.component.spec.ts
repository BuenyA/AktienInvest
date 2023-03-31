import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighscoreListComponent } from './highscore-list.component';

describe('HighscoreListComponent', () => {
  let component: HighscoreListComponent;
  let fixture: ComponentFixture<HighscoreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighscoreListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighscoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
