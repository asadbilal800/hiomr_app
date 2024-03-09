import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittingDoctorComponent } from './submitting-doctor.component';

describe('SubmittingDoctorComponent', () => {
  let component: SubmittingDoctorComponent;
  let fixture: ComponentFixture<SubmittingDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmittingDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmittingDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
