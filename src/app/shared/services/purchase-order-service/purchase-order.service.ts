import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {purchaseOrder} from '../../../shared';


@Injectable()
export class PurchaseOrderService {

  orderurl = 'http://localhost:49475/api/Order';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  //orderDetails
  orderDetails() {
    return this.http.get(this.orderurl + "/orderDetails")
  }
  //searchOrderDetails
  searchOrderDetails(purchase_Order_ID: any) {
    return this.http.get(this.orderurl + "/searchOrderDetails?purchase_Order_ID=" + purchase_Order_ID + "")
  }
  //IfExists
  IfExists(purchase_Order_ID: any) {
    return this.http.get(this.orderurl + "/IfExists?purchase_Order_ID=" + purchase_Order_ID + "")
  }
  //getPriviledgedOffices
  getPriviledgedOffices() {
    return this.http.get(this.orderurl + "/getPriviledgedOffices")
  }
  //getSuppliers
  getSuppliers() {
    return this.http.get(this.orderurl + "/getSuppliers")
  }
  //getContacts
  getContacts(Supplier_ID: Number) {
    return this.http.get(this.orderurl + "/getContacts?Supplier_ID=" + Supplier_ID + "")
  }
  //getItems
  getItems() {
    return this.http.get(this.orderurl + "/getItems")
  }
  //getUnitPrice
  getUnitPrice(item_ID: Number) {
    return this.http.get(this.orderurl + "/getUnitPrice?item_ID=" + item_ID + "")
  }
  //getPayments
  getPayments() {
    return this.http.get(this.orderurl + "/getPayments")
  }
  //guidExist
  guidExist(guid: any) {
    return this.http.get(this.orderurl + "/guidExist?guid=" + guid + "")
  }
  //saveOrder
  saveOrder(order: any): Promise<any> {
    let body = JSON.stringify(order);
    alert(body);
    return this.http.post(this.orderurl, order, { headers: this.headers })
      .toPromise()
      .then(res => res.json() as purchaseOrder)
      .catch()
  }
  //updateOrder
  updateOrder(order: any): Promise<any> {
    let body = JSON.stringify(order);
    // alert(body);
    return this.http.put(this.orderurl, order, { headers: this.headers })
      .toPromise()
      .then(res => res.json() as purchaseOrder)
      .catch()
  }
  //getDetailsByID
  getDetailsByID(purchase_Order_ID: Number): Observable<purchaseOrder> {
    return this.http.get(this.orderurl + "/getDetailsByID?orderID=" + purchase_Order_ID + "")
      .map((res: Response) => {
        return res.json()[0];
      })
      .catch(this.handleError);
  }
  //handleError
  private handleError(error: any) {
    var applicationError = error.headers.get('Application-Error');
    var serverError = error.json();
    var modelStateErrors: string = '';

    if (!serverError.type) {
      console.log(serverError);
      for (var key in serverError) {
        if (serverError[key])
          modelStateErrors += serverError[key] + '\n';
      }
    }
    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    return Observable.throw(applicationError || modelStateErrors || 'Server error');
  }
}

