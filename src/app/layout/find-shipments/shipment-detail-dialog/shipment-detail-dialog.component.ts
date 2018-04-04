import { ShipmentRequestService } from './../../../shared/services/shipmentrequest.service';
import { ShipmentRequest } from './../../../models/shipmentrequest';
import { TranslateService } from '@ngx-translate/core';
import { ShipmentAnnouncement } from './../../../models/shipmentannouncement';
import { User } from './../../../models/user';
import { AlertService } from './../../../shared/services/alert.service';
import { UserService } from './../../../shared/services/user.service';
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-shipment-detail-dialog',
  templateUrl: './shipment-detail-dialog.component.html',
  styleUrls: ['./shipment-detail-dialog.component.scss']
})
export class ShipmentDetailDialogComponent implements OnInit {

    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);

    modelsuggestedpickupdate: any;
    modelsuggesteddeliverydate: any;

    constructor(
        public dialogRef: MatDialogRef<ShipmentDetailDialogComponent>,
        private alertService: AlertService,
        private translate: TranslateService,
        private shipmentRequestService: ShipmentRequestService,
        @Inject(MAT_DIALOG_DATA) public shipmentAnnouncement: ShipmentAnnouncement) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    submitForm() {
        const shipmentRequest = this.buildShipmentRequestFromModel();
        this.shipmentRequestService.save(shipmentRequest).subscribe(
            res => {
                if (res.success === true) {
                    this.alertService.success(this.translate.instant('Successfull Requested'));
                    this.onNoClick();
                } else {
                    this.alertService.error(this.translate.instant('Server Error'), res.message);
                }
        });
    }

    buildShipmentRequestFromModel(): ShipmentRequest {
        const shipmentRequest: ShipmentRequest = new ShipmentRequest();

        const currentUser: User = new User();
        currentUser.displayname = JSON.parse(localStorage.getItem('currentUser')).username;
        shipmentRequest.deliverer = currentUser;

        shipmentRequest.pickupdatetime = this.modelsuggestedpickupdate;
        shipmentRequest.deliverydatetime = this.modelsuggesteddeliverydate;

        shipmentRequest.shipmentannouncement = this.shipmentAnnouncement;

        return shipmentRequest;
    }

    ngOnInit() {
    }

}
