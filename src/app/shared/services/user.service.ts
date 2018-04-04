import { ApiRequestService } from './api-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private apiRequest: ApiRequestService) { }

    signup(signupUser: any): Observable<any> {
        // Will use this subject to emit data that we want after ajax login attempt
        const signupDataSubject: Subject<any> = new Subject<any>();
        // Object that we want to send back to Signup Page
        let signupInfoReturn: any;

        this.apiRequest.post('user/signup', signupUser)
        .subscribe(jsonResp => {
            if (jsonResp !== undefined && jsonResp !== null && jsonResp.operationStatus === 'SUCCESS') {
                // Create a success object that we want to send back to login page
                /*signupInfoReturn = {
                    'success'    : true,
                    'message'    : jsonResp.operationMessage,
                    'user'       : {
                        'username'   : jsonResp.item.username,
                        'role'       : jsonResp.item.role,
                        'token'      : jsonResp.item.token,
                    }
                };*/
            } else {
                // Create a faliure object that we want to send back to login page
                signupInfoReturn = {
                    'success': false,
                    'message': jsonResp.msgDesc,
                    'landingPage': '/login'
                };
            }
            signupDataSubject.next(signupInfoReturn);
        });

        return signupDataSubject;
    }

    createUser(user: any): Observable<any>  {
        const userDataSubject: Subject<any> = new Subject<any>();
        let userData: any = [];

        this.apiRequest.post('user/createAdminUser', user)
            .subscribe(result => {
                    userData = {
                        'success'    : true,
                        'message'    : '',
                        'result'     : result
                    };
                    userDataSubject.next(userData)
                },
                error => {
                    userData = {
                        'success'    : false,
                        'message'    : error.status + ' ' + error.message,
                        'result'     : {}
                    };
                    userDataSubject.next(userData)
                });
        return userDataSubject;
    }

    getAll(): Observable<any>  {
        const userDataSubject: Subject<any> = new Subject<any>();
        let userData: any = [];

        this.apiRequest.get('user/all')
            .subscribe(result => {
                userData = {
                    'success'    : true,
                    'message'    : '',
                    'result'     : result
                };
                userDataSubject.next(userData)
            },
            error => {
                userData = {
                    'success'    : false,
                    'message'    : error.status + ' ' + error.message,
                    'result'     : {}
                };
                userDataSubject.next(userData)
            });
        return userDataSubject;
    }

    getDriverApplicants(): Observable<any>  {
        const userDataSubject: Subject<any> = new Subject<any>();
        let userData: any = [];

        this.apiRequest.get('user/driverApplicants')
            .subscribe(result => {
                    userData = {
                        'success'    : true,
                        'message'    : '',
                        'result'     : result
                    };
                    userDataSubject.next(userData);
                },
                error => {
                    userData = {
                        'success'    : false,
                        'message'    : error.status + ' ' + error.message,
                        'result'     : {}
                    };
                    userDataSubject.next(userData)
                });
        return userDataSubject;
    }

    getCustomers(): Observable<any>  {
        const userDataSubject: Subject<any> = new Subject<any>();
        let userData: any = [];

        this.apiRequest.get('user/customers')
            .subscribe(result => {
                    userData = {
                        'success'    : true,
                        'message'    : '',
                        'result'     : result
                    };
                    userDataSubject.next(userData)
                },
                error => {
                    userData = {
                        'success'    : false,
                        'message'    : error.status + ' ' + error.message,
                        'result'     : {}
                    };
                    userDataSubject.next(userData)
                });
        return userDataSubject;
    }

    getAdmins(): Observable<any>  {
        const userDataSubject: Subject<any> = new Subject<any>();
        let userData: any = [];

        this.apiRequest.get('user/admins')
            .subscribe(result => {
                    userData = {
                        'success'    : true,
                        'message'    : '',
                        'result'     : result
                    };
                    userDataSubject.next(userData)
                },
                error => {
                    userData = {
                        'success'    : false,
                        'message'    : error.status + ' ' + error.message,
                        'result'     : {}
                    };
                    userDataSubject.next(userData)
                });
        return userDataSubject;
    }

    verifyDeliverer(user: any): Observable<any>  {
        const userDataSubject: Subject<any> = new Subject<any>();
        let userData: any = [];

        this.apiRequest.post('user/verifydeliverer', user)
            .subscribe(result => {
                userData = {
                    'success'    : true,
                    'message'    : '',
                    'result'     : result
                };
                userDataSubject.next(userData)
            },
            error => {
                userData = {
                    'success'    : false,
                    'message'    : error.status + ' ' + error.message,
                    'result'     : {}
                };
                userDataSubject.next(userData)
            });
        return userDataSubject;
    }

    blockUser(user: any): Observable<any>  {
        const userDataSubject: Subject<any> = new Subject<any>();
        let userData: any = [];

        this.apiRequest.post('user/block', user)
            .subscribe(result => {
                    userData = {
                        'success'    : true,
                        'message'    : '',
                        'result'     : result
                    };
                    userDataSubject.next(userData)
                },
                error => {
                    userData = {
                        'success'    : false,
                        'message'    : error.status + ' ' + error.message,
                        'result'     : {}
                    };
                    userDataSubject.next(userData)
                });
        return userDataSubject;
    }

    unblockUser(user: any): Observable<any>  {
        const userDataSubject: Subject<any> = new Subject<any>();
        let userData: any = [];

        this.apiRequest.post('user/unblock', user)
            .subscribe(result => {
                    userData = {
                        'success'    : true,
                        'message'    : '',
                        'result'     : result
                    };
                    userDataSubject.next(userData)
                },
                error => {
                    userData = {
                        'success'    : false,
                        'message'    : error.status + ' ' + error.message,
                        'result'     : {}
                    };
                    userDataSubject.next(userData)
                });
        return userDataSubject;
    }

}
