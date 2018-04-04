import { Subject, Observable } from 'rxjs/Rx';
import { NgModule, Component, Injectable } from '@angular/core';


@Injectable()
export class AlertService {
    private subject = new Subject<any>();

    constructor() {
    }

    success(title: string, message: string = '') {
        this.subject.next({
            type: 'success',
            title: title,
            message: message
        });
    }

    error(title: string, message: string = '') {
        this.subject.next({
            type: 'error',
            title: title,
            message: message
        });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
