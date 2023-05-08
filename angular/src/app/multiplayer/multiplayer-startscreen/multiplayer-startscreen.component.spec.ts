import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerStartscreenComponent } from './multiplayer-startscreen.component';

describe('MultiplayerStartscreenComponent', () => {
  let component: MultiplayerStartscreenComponent;
  let fixture: ComponentFixture<MultiplayerStartscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplayerStartscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplayerStartscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
