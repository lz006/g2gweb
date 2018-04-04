import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminDialogComponent } from './create-admin-dialog.component';

describe('CreateAdminDialogComponent', () => {
  let component: CreateAdminDialogComponent;
  let fixture: ComponentFixture<CreateAdminDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdminDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
