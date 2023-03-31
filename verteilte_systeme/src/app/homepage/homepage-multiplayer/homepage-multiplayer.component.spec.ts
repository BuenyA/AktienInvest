import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageMultiplayerComponent } from './homepage-multiplayer.component';

describe('HomepageMultiplayerComponent', () => {
  let component: HomepageMultiplayerComponent;
  let fixture: ComponentFixture<HomepageMultiplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageMultiplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageMultiplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
