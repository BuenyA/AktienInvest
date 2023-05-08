import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerErstellenDialogComponent } from './multiplayer-erstellen-dialog.component';

describe('MultiplayerErstellenDialogComponent', () => {
  let component: MultiplayerErstellenDialogComponent;
  let fixture: ComponentFixture<MultiplayerErstellenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplayerErstellenDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplayerErstellenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
