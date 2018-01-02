import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class ReportService {

    url = 'http://localhost:49475/api/DropDowns';
    url1 = 'http://localhost:49475/api/Reports';
    constructor(private http: Http) { }
    getOffice() {
        return this.http.get(this.url + '/office');
    }
    getCustomer() {
        return this.http.get(this.url + '/customer');
    }
    getCustomerCategory() {
        return this.http.get(this.url + '/customercategory');
    }
    getSupplier() {
        return this.http.get(this.url + '/supplier');
    }
    getCity() {
        return this.http.get(this.url + '/city');
    }
    toDatabase(body) {
        return this.http.post(this.url1, body);
    }
    getPage() {
        return this.http.get(this.url + '/page');
    }
    getDistricts() {
        return this.http.get(this.url + '/district');
    }
    getItem() {
        return this.http.get(this.url + '/item');
    }
    getItemCategory() {
        return this.http.get(this.url + '/itemcategory');
    }
    getItemSubCategory() {
        return this.http.get(this.url + '/itemsubcategory');
    }

}
