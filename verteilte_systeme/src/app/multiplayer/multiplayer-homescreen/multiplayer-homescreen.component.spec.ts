import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerHomescreenComponent } from './multiplayer-homescreen.component';

describe('MultiplayerHomescreenComponent', () => {
  let component: MultiplayerHomescreenComponent;
  let fixture: ComponentFixture<MultiplayerHomescreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplayerHomescreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplayerHomescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
