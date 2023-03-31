import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageWeitereAktienComponent } from './homepage-weitere-aktien.component';

describe('HomepageWeitereAktienComponent', () => {
  let component: HomepageWeitereAktienComponent;
  let fixture: ComponentFixture<HomepageWeitereAktienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageWeitereAktienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageWeitereAktienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
