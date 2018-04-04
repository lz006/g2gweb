import { MatDialog } from '@angular/material';
import { ShipmentDetailDialogComponent } from './shipment-detail-dialog/shipment-detail-dialog.component';
import { Address } from './../../models/address';
import { GeocodeService } from './../../shared/services/geocode.service';
import { ShipmentSubscription } from './../../models/shipmentsubscription';
import { ShipmentAnnouncementSpot } from './../../models/shipmentannouncementspot';
import { DatePipe } from '@angular/common';
import { ShipmentAnnouncementService } from './../../shared/services/shipmentannouncement.service';
import { AlertService } from './../../shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { ShipmentAnnouncement } from './../../models/shipmentannouncement';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-find-shipments',
  templateUrl: './find-shipments.component.html',
  styleUrls: ['./find-shipments.component.css']
})
export class FindShipmentsComponent {

    autoTicks = false;
    disabled = false;
    invert = false;
    showTicks = false;
    thumbLabel = false;
    vertical = false;

    modelsourceaddress: any = { radius: 1};
    modeldestinationaddress: any = { radius: 1};
    shipmentAnnouncements: ShipmentAnnouncement[] = [];
    coords: any[] = [];

    // google maps zoom level
    zoom: number = 8;

    // initial center position for the map
    lat: number = 51.673858;
    lng: number = 7.815982;

    markers: Marker[] = [
        {
            lat: 51.673858,
            lng: 7.815982,
            label: 'A',
            draggable: true
        },
        {
            lat: 51.373858,
            lng: 7.215982,
            label: 'B',
            draggable: false
        },
        {
            lat: 51.723858,
            lng: 7.895982,
            label: 'C',
            draggable: true
        }
    ];

    constructor(private translate: TranslateService,
        private alertService: AlertService,
        private shipmentAnnouncementService: ShipmentAnnouncementService,
        private datePipe: DatePipe,
        public dialog: MatDialog,
        private geocodeService: GeocodeService) {
    }

    submitForm() {

        const shipmentSubscription: ShipmentSubscription = new ShipmentSubscription();
        shipmentSubscription.radius = this.modelsourceaddress.radius;
        shipmentSubscription.source = new Address();
        shipmentSubscription.source.postcode = this.modelsourceaddress.postcode;
        shipmentSubscription.source.city = this.modelsourceaddress.city;
        shipmentSubscription.source.country = this.modelsourceaddress.country;

        shipmentSubscription.destinationradius = this.modeldestinationaddress.radius;
        shipmentSubscription.destination = new Address();
        shipmentSubscription.destination.postcode = this.modeldestinationaddress.postcode;
        shipmentSubscription.destination.city = this.modeldestinationaddress.city;
        shipmentSubscription.destination.country = this.modeldestinationaddress.country;

        const sourceAddressString =
        shipmentSubscription.source.postcode + '+' +
        shipmentSubscription.source.city;

        const destinationAddressString =
        shipmentSubscription.destination.postcode + '+' +
        shipmentSubscription.destination.city;

        if (!this.modeldestinationaddress.postcode && !this.modeldestinationaddress.city) {
            this.geocodeService.getCoordinates(sourceAddressString).subscribe(
                res => {
                    if (res.success === true) {
                        shipmentSubscription.sourcecoordinates =
                            res.result.results[0].geometry.location.lat + ',' + res.result.results[0].geometry.location.lng;
                        this.lat = +res.result.results[0].geometry.location.lat;
                        this.lng = +res.result.results[0].geometry.location.lng;
                        this.findShipmentAnnouncement(shipmentSubscription);

                    } else {
                        this.alertService.error(this.translate.instant('Server Error'), res.message);
                    }
                }
            );
        } else {
            const sourceCoords = this.geocodeService.getCoordinates(sourceAddressString);
            const destinationCoords = this.geocodeService.getCoordinates(destinationAddressString);

            Observable.combineLatest([sourceCoords, destinationCoords]).subscribe(results => {

                if (results[0].success === true && results[1].success === true) {

                    shipmentSubscription.sourcecoordinates =
                    results[0].result.results[0].geometry.location.lat + ',' + results[0].result.results[0].geometry.location.lng;
                    this.lat = +results[0].result.results[0].geometry.location.lat;
                    this.lng = +results[0].result.results[0].geometry.location.lng;

                    shipmentSubscription.destinationcoordinates =
                    results[1].result.results[0].geometry.location.lat + ',' + results[1].result.results[0].geometry.location.lng;

                    this.findShipmentAnnouncement(shipmentSubscription);

                } else {
                    this.alertService.error(this.translate.instant('Server Error'),
                        'source: ' + results[0].message +
                        ', destination: ' + results[1].message);
                }
            });
        }
    }

    findShipmentAnnouncement(shipmentSubscription: ShipmentSubscription) {
        this.shipmentAnnouncementService.find(shipmentSubscription).subscribe(
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

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`);
    }

    mapClicked($event: MouseEvent) {
        /*this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true
        });*/
    }

    markerDragEnd(m: Marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    test() {
        console.log(this.coords[0].lat);
        console.log(this.coords[0].lng);
    }

    handleShipmentChanged() {
        // this.loadUsers();
    }

    openShipmentDetailDialog(shipmentAnnouncementToDisplay): void {
        const dialogRef = this.dialog.open(ShipmentDetailDialogComponent, {
            width: '50%',
            height: '50%',
            data: shipmentAnnouncementToDisplay
        });
        dialogRef.afterClosed().subscribe(result => {
            // this.change.emit();
        });

    }

}

// just an interface for type safety.
interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}
