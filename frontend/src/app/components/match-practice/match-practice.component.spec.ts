import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPracticeComponent } from './match-practice.component';

describe('MatchPracticeComponent', () => {
  let component: MatchPracticeComponent;
  let fixture: ComponentFixture<MatchPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchPracticeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
