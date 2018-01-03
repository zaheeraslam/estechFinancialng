import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';


import { UUID } from 'angular2-uuid';
import { LoginService, User } from '../shared';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    submitted = false;
    loading = false;
    returnUrl: string;
    user_ID: any;
    login: any;
    password_Value: any;
    active: any;
    value = '';
    url: any;
    URL: any;
    URL1: any;
    AuthKey: any = "0";
    GUID: any = "0";
    ViewerPath: any;
    viewerPath: any;
    constructor(private service: LoginService,
        private router: Router) { }

    ngOnInit() {
        this.getReportURL();
        this.getViewerPath();
        this.service.isLogged('user_ID').then((result: boolean) => {
            this.service.isLogged('login').then((res: boolean) => {
                if (result && res) {
                    this.router.navigate(['/login']);
                }
            });
        });
        document.getElementById('error').style.display = 'none';
        localStorage.setItem("isLoggedIn", "False");
    }
    onLoggedin(login, password_Value) {
        this.AuthKey = UUID.UUID();
        this.service.login(login, password_Value)
            .subscribe((o: User) => {
                if (o != null) {
                    if (typeof (Storage) !== 'undefined') {
                        sessionStorage.setItem('user_ID', o[0].user_ID);
                        sessionStorage.setItem('login', o[0].login);
                        sessionStorage.setItem('URL', this.URL);
                        sessionStorage.setItem('AuthKey', this.AuthKey);
                    }
                    this.submitted = true;
                    this.user_ID = o[0].user_ID;
                    this.login = o[0].login;
                    this.password_Value = o[0].password_Value;
                    this.active = o[0].active;
                    //  this.setSessions();
                    this.setAuthKey();
                    localStorage.setItem("isLoggedin", "True");
                    this.router.navigate(['/dashboard']);
                } else {
                    document.getElementById('error').style.display = 'block';
                }
            });
        
    }
    getReportURL() {
        this.service.getReportURL()
            .subscribe(response => {
                this.url = (response.json());
                this.URL = this.url[0].recorD_DESC;
                // console.log(response.json()[0]);
            });
    }
    getViewerPath() {
        this.service.getViewerPath()
            .subscribe(response => {
                this.viewerPath = (response.json());
                this.ViewerPath = this.viewerPath[0].recorD_DESC;
                sessionStorage.setItem('ViewerPath', this.viewerPath[0].recorD_DESC);
              
                // console.log(response.json()[0]);
            });
    }
    setSessions() {
        this.service.setSessions(this.AuthKey)
            .subscribe(response => {
                console.log(response);
                this.URL1 = (response.toString());
            });
    }
    setAuthKey() {
        this.service.setAuthKey(this.user_ID, this.AuthKey)
            .subscribe(response => {
                console.log(response);
                this.URL1 = (response.toString());
            });
    }

   
}
