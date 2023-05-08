import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerPlayerListComponent } from './multiplayer-player-list.component';

describe('MultiplayerPlayerListComponent', () => {
  let component: MultiplayerPlayerListComponent;
  let fixture: ComponentFixture<MultiplayerPlayerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplayerPlayerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplayerPlayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
