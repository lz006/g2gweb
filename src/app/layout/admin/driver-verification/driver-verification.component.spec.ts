import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverVerificationComponent } from './driver-verification.component';

describe('DriverVerificationComponent', () => {
  let component: DriverVerificationComponent;
  let fixture: ComponentFixture<DriverVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
