import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageDeineAktienComponent } from './homepage-deine-aktien.component';

describe('HomepageDeineAktienComponent', () => {
  let component: HomepageDeineAktienComponent;
  let fixture: ComponentFixture<HomepageDeineAktienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageDeineAktienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageDeineAktienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
