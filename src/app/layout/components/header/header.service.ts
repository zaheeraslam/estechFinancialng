
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeaderService {


    URL = 'http://localhost:49475/api/Login';

    constructor(private http: Http) { }
    //getHeaders
    getHeaders(logedInUserID: any) {
        return this.http.get(this.URL + "/getHeaders?logedInUserID=" + logedInUserID + "")
    }
    //getSubHeaders
    getSubHeaders(logedInUserID: any) {
        return this.http.get(this.URL + "/getSubHeaders?logedInUserID=" + logedInUserID + "")
    }
    //getUserPriviligedFiles
    getUserPriviligedFiles(logedInUserID: any) {
        return this.http.get(this.URL + "/getUserPriviligedFiles?logedInUserID=" + logedInUserID + "")
    }
    //getPageDetail
    getPageDetail(page_ID: any) {
        return this.http.get(this.URL + "/getPageDetail?page_ID=" + page_ID + "")
    }

}