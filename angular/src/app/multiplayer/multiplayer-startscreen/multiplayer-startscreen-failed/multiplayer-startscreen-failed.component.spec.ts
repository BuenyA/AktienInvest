import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerStartscreenFailedComponent } from './multiplayer-startscreen-failed.component';

describe('MultiplayerStartscreenFailedComponent', () => {
  let component: MultiplayerStartscreenFailedComponent;
  let fixture: ComponentFixture<MultiplayerStartscreenFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplayerStartscreenFailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplayerStartscreenFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
