import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreClickComponent } from './score-click.component';

describe('ScoreClickComponent', () => {
  let component: ScoreClickComponent;
  let fixture: ComponentFixture<ScoreClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreClickComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
