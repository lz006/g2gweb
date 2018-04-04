import { Injectable } from '@angular/core';

/**
 * This is a singleton class
 */
@Injectable()
export class AppConfig {
    // Provide all the Application Configs here

    public version = '1.0.0';
    public locale  = 'en-US';
    public currencFormat = { style: 'currency', currency: 'USD' };
    public dateFormat     = { year: 'numeric', month: 'short', day: 'numeric'};

    // API Related configs
    public apiPort = '8080';
    public apiProtocol;
    public apiHostName = 'http://172.16.15.128';
    public baseApiPath = 'http://172.16.15.128:' + this.apiPort  + '/';
    public mapApiKey = 'AIzaSyDOxfSQeogDuhh0w0FXmNJ81cavruy4Gkk';

    constructor() {
    }
}