import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerHomepageComponent } from './multiplayer-homepage.component';

describe('MultiplayerHomepageComponent', () => {
  let component: MultiplayerHomepageComponent;
  let fixture: ComponentFixture<MultiplayerHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplayerHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplayerHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
