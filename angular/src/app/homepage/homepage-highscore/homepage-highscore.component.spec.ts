import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageHighscoreComponent } from './homepage-highscore.component';

describe('HomepageHighscoreComponent', () => {
  let component: HomepageHighscoreComponent;
  let fixture: ComponentFixture<HomepageHighscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageHighscoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageHighscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
