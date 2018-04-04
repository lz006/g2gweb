import { AppConfig } from './../../app-config';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest,  HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subject } from 'rxjs/';
import 'rxjs/add/operator/catch';


@Injectable()
export class ApiRequestService {

    constructor(
        private appConfig: AppConfig,
        private http: HttpClient,
        private router: Router,
        // private userInfoService: UserInfoService
    ) {}

    /**
     * This is a Global place to add all the request headers for every REST calls
     */
    getHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        let token = null;
        if (localStorage.getItem('currentUser')) {
            const currentUser = localStorage.getItem('currentUser');
            const theUser: any = JSON.parse(currentUser).user;
            token = theUser.token;
        }

        headers = headers.append('Content-Type', 'application/json');
        if (token !== null) {
            headers = headers.append('Authorization', token);
        }
        return headers;
    }

    get(url: string, urlParams?: HttpParams): Observable<any> {
        const me = this;
        return this.http.get(this.appConfig.baseApiPath + url, {headers: this.getHeaders(),  params: urlParams} )
            .catch(function(error: any) {
                /*console.log('Some error in catch');
                if (error.status === 401 || error.status === 403) {
                    me.router.navigate(['/logout']);
                }*/
                return Observable.throw(error || {status: this.translate.instant('Error'), message: ''});
            });
    }

    getByCustomPath(url: string, urlParams?: any): Observable<any> {
        const me = this;
        return this.http.get(url, {params: urlParams} )
            .catch(function(error: any) {
                /*console.log('Some error in catch');
                if (error.status === 401 || error.status === 403) {
                    me.router.navigate(['/logout']);
                }*/
                return Observable.throw(error || {status: this.translate.instant('Error'), message: ''});
            });
    }

    post(url: string, body: Object): Observable<any> {
        const me = this;
        return this.http.post(this.appConfig.baseApiPath + url, JSON.stringify(body), { headers: this.getHeaders()})
            .catch(function(error: any) {
                /*if (error.status === 401) {
                    me.router.navigate(['/logout']);
                }*/
                return Observable.throw(error || {status: this.translate.instant('Error'), message: ''});
            });
    }

    put(url: string, body: Object): Observable<any> {
        const me = this;
        return this.http.put(this.appConfig.baseApiPath + url, JSON.stringify(body), { headers: this.getHeaders()})
            .catch(function(error: any) {
                if (error.status === 401) {
                    me.router.navigate(['/logout']);
                }
                return Observable.throw(error || 'Server error');
            });
    }

    delete(url: string): Observable<any> {
        const me = this;
        return this.http.delete(this.appConfig.baseApiPath + url, { headers: this.getHeaders()})
            .catch(function(error: any) {
                if (error.status === 401) {
                    me.router.navigate(['/logout']);
                }
                return Observable.throw(error || 'Server error');
            });
    }

}
