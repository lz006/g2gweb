import { DatePipe } from '@angular/common';
import { GeocodeService } from './../../../shared/services/geocode.service';
import { User } from './../../../models/user';
import { Address } from './../../../models/address';
import { ShipmentAnnouncement } from './../../../models/shipmentannouncement';
import { ShipmentAnnouncementService } from './../../../shared/services/shipmentannouncement.service';
import { AlertService } from './../../../shared/services/alert.service';
import { ShipmentSizeService } from './../../../shared/services/shipmentsize.service';
import { TranslateService } from '@ngx-translate/core';
import { ShipmentSize } from './../../../models/shipmentsize';
import { OnInit, Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-shipment-form',
    templateUrl: './shipment-form.component.html',
    styleUrls: ['./shipment-form.component.css'],
})
export class ShipmentFormComponent implements OnInit {

    testcountry: string;

    @ViewChild('f') mainForm: NgForm;

    @Input() shipmentAnnouncements: ShipmentAnnouncement[] = [];
    @Input() changeFlag: boolean;
    @Input() header: string;
    @Input()
    set shipmentAnnouncement(currentShipmentAnnouncement: ShipmentAnnouncement) {
        this.changeFlag = true;
        this.currentShipmentAnnouncement = currentShipmentAnnouncement;
        this.resetForm(this.mainForm, true);
        this.resetForm(this.mainForm, true);
        this.setFormFields(currentShipmentAnnouncement);
    }

    currentShipmentAnnouncement: ShipmentAnnouncement;

    modelshipment: any = {};
    shipmentsizes: ShipmentSize[] = [];
    selectshipmentsizes: Array<any> = [];
    modelsourceaddress: any = {};
    modeldestinationaddress: any = {};

    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);

    modelearliestpickupdate: any;
    modellatestpickupdate: any;
    modeldeliverydate: any;

    selected: any = '1';

    constructor(
        private translate: TranslateService,
        private shipmentSizeService: ShipmentSizeService,
        private alertService: AlertService,
        private shipmentAnnouncementService: ShipmentAnnouncementService,
        private geocodeService: GeocodeService,
        private datePipe: DatePipe) {

        this.loadShipmentSizes();
    }

    loadShipmentSizes() {
        this.shipmentSizeService.getAll().subscribe(
            res => {
                if (res.success === true) {
                    this.shipmentsizes = res.result;
                    for (let _i = 0; _i < this.shipmentsizes.length; _i++) {
                        this.selectshipmentsizes.push({label:
                            this.shipmentsizes[_i].name + ', ' +
                            this.shipmentsizes[_i].maxheight + ' x ' +
                            this.shipmentsizes[_i].maxlength + ' x ' +
                            this.shipmentsizes[_i].maxwidth + ' ' +
                            this.shipmentsizes[_i].measure + ', ' +
                            this.shipmentsizes[_i].maxweight + ' kg', value: this.shipmentsizes[_i]});
                    }
                } else {
                    this.alertService.error(this.translate.instant('Server Error'), res.message);
                }
            });

    }

    ngOnInit(): void {
    }

    submitForm(form: NgForm) {
        // In case that 
        if (this.changeFlag) {
            const index = this.shipmentAnnouncements.findIndex(function (item) {
                return item.id === this.id;
            }, this.currentShipmentAnnouncement);

            if (index < 0) {
                this.resetForm(this.mainForm, false);
                return;
            }
        }

        const shipmentAnnouncementCanditate: ShipmentAnnouncement = this.buildShipmentAnnouncemetFromModel();

        const sourceAddressString =
            shipmentAnnouncementCanditate.source.street + '+' +
            shipmentAnnouncementCanditate.source.streetno + ',+' +
            shipmentAnnouncementCanditate.source.postcode + '+' +
            shipmentAnnouncementCanditate.source.city;

        const destinationAddressString =
            shipmentAnnouncementCanditate.destination.street + '+' +
            shipmentAnnouncementCanditate.destination.streetno + ',+' +
            shipmentAnnouncementCanditate.destination.postcode + '+' +
            shipmentAnnouncementCanditate.destination.city;

        const sourceCoords = this.geocodeService.getCoordinates(sourceAddressString);
        const destinationCoords = this.geocodeService.getCoordinates(destinationAddressString);

        Observable.combineLatest([sourceCoords, destinationCoords]).subscribe(results => {

            if (results[0].success === true && results[1].success === true) {

                shipmentAnnouncementCanditate.aproxsourcecoordinates =
                    results[0].result.results[0].geometry.location.lat + ',' +
                    results[0].result.results[0].geometry.location.lng;

                shipmentAnnouncementCanditate.aproxdestinationcoordinates =
                    results[1].result.results[0].geometry.location.lat + ',' +
                    results[1].result.results[0].geometry.location.lng;

                this.saveShipmentAnnouncement(shipmentAnnouncementCanditate, form);

            } else {
                this.alertService.error(this.translate.instant('Server Error'),
                    'source: ' + results[0].message +
                    ', destination: ' + results[1].message);
            }
        });
    }

    saveShipmentAnnouncement(shipmentAnnouncementCanditate: ShipmentAnnouncement, form: NgForm) {
        this.shipmentAnnouncementService.save(shipmentAnnouncementCanditate).subscribe(
            res => {
                if (res.success === true) {
                    this.alertService.success(this.translate.instant('Successfull Announced'));
                    if (this.changeFlag === false) {
                        this.shipmentAnnouncements.push(this.formatDatesOfShipmentAnnouncement(res.result));
                    } else {
                        const index = this.shipmentAnnouncements.findIndex(function (item) {
                            return item.id === this.id;
                        }, res.result);
                        this.shipmentAnnouncements.splice(index, 1);
                        this.shipmentAnnouncements.push(this.formatDatesOfShipmentAnnouncement(res.result));
                    }

                    this.resetForm(form, false);
                } else {
                    this.alertService.error(this.translate.instant('Server Error'), res.message);
                }
        });
    }

    formatDatesOfShipmentAnnouncement(shipmentAnnouncement: ShipmentAnnouncement): ShipmentAnnouncement {
        shipmentAnnouncement.earliestpickupdate = this.createDateFromString(
            this.datePipe.transform(shipmentAnnouncement.earliestpickupdate.toString(), 'yyyy-MM-dd'));
        shipmentAnnouncement.latestpickupdate = this.createDateFromString(
            this.datePipe.transform(shipmentAnnouncement.latestpickupdate.toString(), 'yyyy-MM-dd'));
        shipmentAnnouncement.latestdeliverydate = this.createDateFromString(
            this.datePipe.transform(shipmentAnnouncement.latestdeliverydate.toString(), 'yyyy-MM-dd'));
        return shipmentAnnouncement;
    }

    createDateFromString(date: string): Date {
        const newDate: Date = new Date();
        newDate.setFullYear(+date.substr(0, 4));
        newDate.setMonth(+date.substr(5, 2) - 1);
        newDate.setDate(+date.substr(8, 2));
        return newDate;
    }

    resetForm(form: NgForm, changeFlag: boolean) {
        form.reset();
        form.resetForm();
        this.changeFlag = changeFlag;
    }

    buildShipmentAnnouncemetFromModel(): ShipmentAnnouncement {

        const sourceAddress: Address = new Address();
        if (this.modelsourceaddress.companyname) {
            sourceAddress.companyname = this.modelsourceaddress.companyname;
        }
        sourceAddress.firstname = this.modelsourceaddress.firstname;
        sourceAddress.lastname = this.modelsourceaddress.lastname;
        sourceAddress.street = this.modelsourceaddress.street;
        sourceAddress.streetno = this.modelsourceaddress.streetno;
        sourceAddress.postcode = this.modelsourceaddress.postcode;
        sourceAddress.city = this.modelsourceaddress.city;
        sourceAddress.country = this.modelsourceaddress.country;

        const destinationAddress: Address = new Address();
        if (this.modeldestinationaddress.companyname) {
            sourceAddress.companyname = this.modeldestinationaddress.companyname;
        }
        destinationAddress.firstname = this.modeldestinationaddress.firstname;
        destinationAddress.lastname = this.modeldestinationaddress.lastname;
        destinationAddress.street = this.modeldestinationaddress.street;
        destinationAddress.streetno = this.modeldestinationaddress.streetno;
        destinationAddress.postcode = this.modeldestinationaddress.postcode;
        destinationAddress.city = this.modeldestinationaddress.city;
        destinationAddress.country = this.modeldestinationaddress.country;

        const currentUser: User = new User();
        currentUser.displayname = JSON.parse(localStorage.getItem('currentUser')).username;

        const shipmentAnnouncementCandidate: ShipmentAnnouncement = new ShipmentAnnouncement();
        shipmentAnnouncementCandidate.description = this.modelshipment.description;

        shipmentAnnouncementCandidate.size = this.selected === '1' ?
            this.currentShipmentAnnouncement.size : this.selected;

        if (this.changeFlag) {
            shipmentAnnouncementCandidate.id = this.currentShipmentAnnouncement.id;
        }

        shipmentAnnouncementCandidate.latestdeliverydate = this.modeldeliverydate;
        shipmentAnnouncementCandidate.latestpickupdate = this.modellatestpickupdate;
        shipmentAnnouncementCandidate.earliestpickupdate = this.modelearliestpickupdate;
        shipmentAnnouncementCandidate.destination = destinationAddress;
        shipmentAnnouncementCandidate.source = sourceAddress;
        shipmentAnnouncementCandidate.sender = currentUser;

        return shipmentAnnouncementCandidate;

    }

    setFormFields(currentShipmentAnnouncement: ShipmentAnnouncement) {
        // Timeout necessary due to a bug in Angular Forms
        setTimeout(() => {
            this.selected = '1';
            this.modelshipment.description = currentShipmentAnnouncement.description;

            this.modelearliestpickupdate = currentShipmentAnnouncement.earliestpickupdate;
            this.modellatestpickupdate = currentShipmentAnnouncement.latestpickupdate;
            this.modeldeliverydate = currentShipmentAnnouncement.latestdeliverydate;

            this.modelsourceaddress = {};
            this.modelsourceaddress.companyname = currentShipmentAnnouncement.source.companyname;
            this.modelsourceaddress.firstname = currentShipmentAnnouncement.source.firstname;
            this.modelsourceaddress.lastname = currentShipmentAnnouncement.source.lastname;
            this.modelsourceaddress.street = currentShipmentAnnouncement.source.street;
            this.modelsourceaddress.streetno = currentShipmentAnnouncement.source.streetno;
            this.modelsourceaddress.postcode = currentShipmentAnnouncement.source.postcode;
            this.modelsourceaddress.city = currentShipmentAnnouncement.source.city;
            this.modelsourceaddress.country = currentShipmentAnnouncement.source.country;

            this.modeldestinationaddress = {};
            this.modeldestinationaddress.companyname = currentShipmentAnnouncement.destination.companyname;
            this.modeldestinationaddress.firstname = currentShipmentAnnouncement.destination.firstname;
            this.modeldestinationaddress.lastname = currentShipmentAnnouncement.destination.lastname;
            this.modeldestinationaddress.street = currentShipmentAnnouncement.destination.street;
            this.modeldestinationaddress.streetno = currentShipmentAnnouncement.destination.streetno;
            this.modeldestinationaddress.postcode = currentShipmentAnnouncement.destination.postcode;
            this.modeldestinationaddress.city = currentShipmentAnnouncement.destination.city;
            this.modeldestinationaddress.country = currentShipmentAnnouncement.destination.country;
       }, 20);

    }
}