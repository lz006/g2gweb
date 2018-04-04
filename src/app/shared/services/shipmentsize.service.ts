import { ApiRequestService } from './api-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/';
import 'rxjs/add/operator/map';

@Injectable()
export class ShipmentSizeService {
    constructor(private http: HttpClient, private apiRequest: ApiRequestService) { }

    getAll(): Observable<any> {
        // Will use this subject to emit data that we want after ajax login attempt
        const loginDataSubject: Subject<any> = new Subject<any>();
        // Object that we want to send back to Login Page
        let resultShipmentSizes: any = [];

        this.apiRequest.get('/shipmentsize/all').subscribe(result => {
            resultShipmentSizes = {
                'success'    : true,
                'message'    : '',
                'result'     : result
            };
            loginDataSubject.next(resultShipmentSizes);
        },
        error => {
            resultShipmentSizes = {
                'success'    : false,
                'message'    : error.status + ' ' + error.message,
                'result'     : {}
            };
            loginDataSubject.next(resultShipmentSizes);
        });

        return loginDataSubject;
    }
}

