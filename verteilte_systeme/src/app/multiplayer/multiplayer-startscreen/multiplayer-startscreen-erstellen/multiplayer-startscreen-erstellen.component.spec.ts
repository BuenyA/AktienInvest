import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerStartscreenErstellenComponent } from './multiplayer-startscreen-erstellen.component';

describe('MultiplayerStartscreenErstellenComponent', () => {
  let component: MultiplayerStartscreenErstellenComponent;
  let fixture: ComponentFixture<MultiplayerStartscreenErstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplayerStartscreenErstellenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplayerStartscreenErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
