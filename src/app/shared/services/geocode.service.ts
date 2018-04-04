import { AppConfig } from './../../app-config';
import { ApiRequestService } from './api-request.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/';
import 'rxjs/add/operator/map';

@Injectable()
export class GeocodeService {
    constructor(
        private http: HttpClient,
        private apiRequest: ApiRequestService,
        private appConfig: AppConfig) { }

    getCoordinates(address: any): Observable<any> {
        // Will use this subject to emit data that we want after ajax login attempt
        const coordinatesDataSubject: Subject<any> = new Subject<any>();
        // Object that we want to send back to Login Page
        let resultObject: any = [];

        const myParams = {
            'address': address,
            'key': this.appConfig.mapApiKey
        };

        this.apiRequest.getByCustomPath('https://maps.googleapis.com/maps/api/geocode/json', myParams).subscribe(result => {
            resultObject = {
                'success'    : true,
                'message'    : '',
                'result'     : result
            };
            coordinatesDataSubject.next(resultObject);
        },
        error => {
            resultObject = {
                'success'    : false,
                'message'    : error.status + ' ' + error.message,
                'result'     : {}
            };
            coordinatesDataSubject.next(resultObject);
        });

        return coordinatesDataSubject;
    }
}
