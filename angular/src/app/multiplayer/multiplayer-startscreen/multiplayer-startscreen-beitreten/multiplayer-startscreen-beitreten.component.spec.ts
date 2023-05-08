import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerStartscreenBeitretenComponent } from './multiplayer-startscreen-beitreten.component';

describe('MultiplayerStartscreenBeitretenComponent', () => {
  let component: MultiplayerStartscreenBeitretenComponent;
  let fixture: ComponentFixture<MultiplayerStartscreenBeitretenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplayerStartscreenBeitretenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplayerStartscreenBeitretenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
