import { ShipmentAnnouncement } from './../../models/shipmentannouncement';
import { ApiRequestService } from './api-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/';
import 'rxjs/add/operator/map';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ShipmentRequestService {
    constructor(
        private http: HttpClient,
        private apiRequest: ApiRequestService,
        private authenticationService: AuthenticationService,
        private router: Router) { }

    save(shipmentrequestcandidate: any): Observable<any> {
        // Will use this subject to emit data that we want after ajax login attempt
        const dataSubject: Subject<any> = new Subject<any>();
        // Object that we want to send back to Login Page
        let resultShipmentRequest: any = [];

        this.apiRequest.post('shipmentrequest/save', shipmentrequestcandidate).subscribe(result => {
            resultShipmentRequest = {
                'success'    : true,
                'message'    : '',
                'result'     : result
            };
            dataSubject.next(resultShipmentRequest);
        },
        error => {
            resultShipmentRequest = {
                'success'    : false,
                'message'    : error.status + ' ' + error.message,
                'result'     : {}
            };
            dataSubject.next(resultShipmentRequest);
        });

        return dataSubject;
    }

    delete(shipmentannouncementcandidate: any): Observable<any> {
        // Will use this subject to emit data that we want after ajax login attempt
        const deleteDataSubject: Subject<any> = new Subject<any>();
        // Object that we want to send back to Login Page
        let resultObject: any = [];

        this.apiRequest.post('shipmentannouncement/delete', shipmentannouncementcandidate).subscribe(result => {
            resultObject = {
                'success'    : true,
                'message'    : '',
                'result'     : result
            };
            deleteDataSubject.next(result);
        },
        error => {
            resultObject = {
                'success'    : false,
                'message'    : error.status + ' ' + error.message,
                'result'     : {}
            };
            deleteDataSubject.next(resultObject);
        });

        return deleteDataSubject;
    }

    getAll(): Observable<any> {
        // Will use this subject to emit data that we want after ajax fetch attempt
        const loginDataSubject: Subject<any> = new Subject<any>();
        // Object that we want to send back to Shipment Page
        let resultShipmentAnnouncement: any = [];

        this.apiRequest.get('shipmentannouncement/getall').subscribe(result => {
            resultShipmentAnnouncement = {
                'success'    : true,
                'message'    : '',
                'result'     : result
            };
            loginDataSubject.next(resultShipmentAnnouncement);
        },
        error => {
            this.redirectToLogin(error);
            resultShipmentAnnouncement = {
                'success'    : false,
                'message'    : error.status + ' ' + error.message,
                'result'     : {}
            };
            loginDataSubject.next(resultShipmentAnnouncement);
        });

        return loginDataSubject;
    }

    redirectToLogin(error) {
        if (error && error.status === 500) {
            this.authenticationService.logout();
            this.router.navigate(['/login']);
        }
    }
}


