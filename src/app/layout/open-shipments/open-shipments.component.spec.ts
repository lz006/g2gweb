import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenShipmentsComponent } from './open-shipments.component';

describe('UserProfileComponent', () => {
  let component: OpenShipmentsComponent;
  let fixture: ComponentFixture<OpenShipmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenShipmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
