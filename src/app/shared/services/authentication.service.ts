import { ApiRequestService } from './api-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private apiRequest: ApiRequestService) { }

    login(loginUser: User): Observable<any> {
        // Will use this subject to emit data that we want after ajax login attempt
        const loginDataSubject: Subject<any> = new Subject<any>();
        // Object that we want to send back to Login Page
        let loginInfoReturn: any;

        this.apiRequest.post('login', loginUser)
        .subscribe(jsonResp => {
            if (jsonResp !== undefined && jsonResp !== null && jsonResp.operationStatus === 'SUCCESS') {
                // Create a success object that we want to send back to login page
                loginInfoReturn = {
                    'success'    : true,
                    'message'    : jsonResp.operationMessage,
                    'user'       : {
                        'username'   : jsonResp.item.username,
                        'role'       : jsonResp.item.role,
                        'token'      : jsonResp.item.token,
                    }
                };
            } else {
                // Create a faliure object that we want to send back to login page
                loginInfoReturn = {
                    'success': false,
                    'message': jsonResp.msgDesc,
                    'landingPage': '/login'
                };
            }
            loginDataSubject.next(loginInfoReturn);
        },
        error => {
            loginInfoReturn = {
                'success'    : false,
                'message'    : error.status + ' ' + error.message
            };
            loginDataSubject.next(loginInfoReturn);
        });

        return loginDataSubject;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
