import { ShipmentAnnouncement } from './../../models/shipmentannouncement';
import { ShipmentAnnouncementService } from './../../shared/services/shipmentannouncement.service';
import { AlertService } from './../../shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-open-shipments',
  templateUrl: './open-shipments.component.html',
  styleUrls: ['./open-shipments.component.css']
})
export class OpenShipmentsComponent implements OnInit {

  shipmentAnnouncements: ShipmentAnnouncement[] = [];

  constructor(private translate: TranslateService,
    private alertService: AlertService,
    private shipmentAnnouncementService: ShipmentAnnouncementService,
    private datePipe: DatePipe) { 
      this.shipmentAnnouncementService.getAll().subscribe(
        res => {
            if (res.success === true) {
                res.result.forEach(element => {
                    element.earliestpickupdate = this.createDateFromString(
                        this.datePipe.transform(element.earliestpickupdate, 'yyyy-MM-dd'));
                    element.latestpickupdate = this.createDateFromString(
                        this.datePipe.transform(element.latestpickupdate, 'yyyy-MM-dd'));
                    element.latestdeliverydate = this.createDateFromString(
                        this.datePipe.transform(element.latestdeliverydate, 'yyyy-MM-dd'));
                });
                this.shipmentAnnouncements = res.result;
            } else {
               this.alertService.error(this.translate.instant('Server Error'), res.message);
            }
      });
  }

  createDateFromString(date: string): Date {
    const newDate: Date = new Date();
    newDate.setFullYear(+date.substr(0, 4));
    newDate.setMonth(+date.substr(5, 2) - 1);
    newDate.setDate(+date.substr(8, 2));
    return newDate;
}

  ngOnInit() {
  }

  deleteShipmentAnnouncement(shipmentAnnouncement: ShipmentAnnouncement) {
    this.shipmentAnnouncementService.delete(shipmentAnnouncement).subscribe(
        res => {
            if (res.success === true) {
                this.alertService.success(this.translate.instant('Successfull Deleted'));
                const index = this.shipmentAnnouncements.findIndex(function (item) {
                    return item.id === this.id;
                }, shipmentAnnouncement);
                if (index > -1) {
                    this.shipmentAnnouncements.splice(index, 1);
                }
            } else {
                this.alertService.error(this.translate.instant('Server Error'), res.message);
            }
    });
  }

}
