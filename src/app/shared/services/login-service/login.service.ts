
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../../Model/User';

// <reference path="./myClass/index.d.ts" />
//   import path from "./../../pathURL";

//  const my = new path();
// my.liveURL();

// var authenticatedUser
@Injectable()
export class LoginService {

    URL = 'http://localhost:49475/api/Login';

    loggedIn = false;
    loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

    private headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http) { }

    // login
    login(login: string, password_Value: string): Observable<User> {

        // alert(login+','+password_Value);
        return this.http.get(this.URL + '/getLogin?login=' + login + '&password_Value=' + password_Value + '')
            .map((res: Response) => {
                //console.log(res.json());
                if (res.json() != null) {

                    this.setLoggedIn(true);
                } else {
                    this.setLoggedIn(false);
                }
                return res.json();


            })
            .catch(this.handleError);
    }
    // setLoggedIn
    setLoggedIn(value: boolean) {
        // Update login status subject
        this.loggedIn$.next(value);
        this.loggedIn = value;
    }
    // logout
    logout() {
        // remove user from local storage to log user outk
        localStorage.removeItem('currentUser');
    }
    // isLogged
    isLogged(value: any): Promise<boolean> {
        if (typeof (Storage) !== 'undefined') {
            if (sessionStorage.getItem(value)) {
                return Promise.resolve(true);
            }
        }
        return Promise.resolve(false);
    }
    getSession(value: any): string {
        if (typeof (Storage) !== 'undefined') {

            if (sessionStorage.getItem(value)) {
                return sessionStorage.getItem(value);
            }

            return 'undefined';
        }
    }
    // getReportURL
    getReportURL() {
        return this.http.get(this.URL + '/getReportURL');
    }
    // getViewerPath
    getViewerPath() {
        return this.http.get(this.URL + '/getViewerPath');
    }
    // setSessions
    setSessions(AuthKey: any) {
        AuthKey = "ab43659f55e7e4f763f33a2dd4f5f98f";
        return this.http.get(this.URL + "/setSessions?AuthKey=" + AuthKey + "");
    }
    // setSessions
    setAuthKey(userID: any, authKey: string) {
        return this.http.get(this.URL + "/recordAuthKey?userID=" + userID + "&authKey=" + authKey + "");
    }
    // handleError
    private handleError(error: any) {
        const applicationError = error.headers.get('Application-Error');
        const serverError = error.json();
        let modelStateErrors = '';

        if (!serverError.type) {
            console.log(serverError);
            for (const key in serverError) {
                if (key != null) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }

}
