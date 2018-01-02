import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CardService {
 url='http://localhost:49475/api/Login/getUserDashboardCards';
  constructor(private http: Http) { }
   getCards(logedInUserID,cardType) {
    return  this.http.get(this.url + '?logedInUserID='+ logedInUserID + '&cardType=' + cardType);
   }
}
