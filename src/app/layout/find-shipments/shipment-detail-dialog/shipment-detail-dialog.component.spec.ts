import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentDetailDialogComponent } from './shipment-detail-dialog.component';

describe('UserDetailDialogComponent', () => {
  let component: ShipmentDetailDialogComponent;
  let fixture: ComponentFixture<ShipmentDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
