import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerWarnComponent } from './multiplayer-warn.component';

describe('MultiplayerWarnComponent', () => {
  let component: MultiplayerWarnComponent;
  let fixture: ComponentFixture<MultiplayerWarnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplayerWarnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplayerWarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
