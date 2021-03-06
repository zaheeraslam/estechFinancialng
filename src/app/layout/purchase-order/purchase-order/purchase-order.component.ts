import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { PurchaseOrderService, Supplier, LoginService, OrderDetailss, Order, OrderDetail, purchaseOrderDetails, purchaseOrder, UtilityDate } from '../../../shared';
import { UUID } from 'angular2-uuid';
import * as $ from 'jquery';
import { NgbModal, ModalDismissReasons, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Select2OptionData } from 'ng2-select2';
import { IMyDpOptions, IMyDateModel, IMyDate } from 'mydatepicker';
@Component({
  selector: 'app-purchase-order',
  host: { '(window:keydown)': 'hotkeys($event)' },
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit, AfterViewChecked {
  public exampleData: Array<Select2OptionData>;
  @ViewChild('dvScroll') private myScrollContainer: ElementRef;
  // for date picker
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    inline: false,
    showClearDateBtn:false,
    showInputField:false,
    height: '25px'
    
  
  };
  public model: IMyDate;// = { date: { year: 2018, month: 10, day: 9 } };
  test:IMyDateModel  = {formatted:"09/10/2018",date: {year: 2018, month: 10, day: 9},epoc:1539025200,jsdate:new Date("2018-10-09")};
 
  private selDate: {};
  
  //Member Variables

  public supp: any;
  closeResult: string;
  order: any;
  status: any;
  orders: any[];
  users: any;
  suppliers: Array<Select2OptionData>;
  contacts: any[];
  items: Array<Select2OptionData>;
  unitPrices: any[];
  payments: any[];
  supplier: Supplier[];
  purchaseOrderDetails: any[];
  purchaseOrderDetail: any;
  selectedItem: Object = {};
  newselectedItem: Object = {};
  selectedSupplier: Supplier = new Supplier(0, 0, '');
  editMode = false;
  index = 1;
  order_Envoy: any = 1;
  public supplier_ID: any;
  supplier_IDID: any;
  SupplierID: any = 0;
  purchase_Order_ID = 0;
  Office_Code: any;
  PO_NO: any;
  Supplier_ID: any = 1;
  contact_Person_ID: any;
  public contact_ID: any;
  shipping_Method: any;
  payment_ID: any;
  freight_Term: any;
  total_Cost: any = 0;
  total_Discount: any = 0;
  freight_Chrgs: any = 1;
  total_Amount: any = 0;
  remarks: any;
  selectSupplier: any[];
  public item_Code: any;
  public item_Name: any;
  IsUpdate: any;
  Quantity: any = 0;
  Discount_Rate: any = 0;
  guid: any;
  mode: any = 0;
  method_Id: any = 1;
  frieght_Id: any = 1;
  pO_Detail_ID: any = 0;
  unit_Price: any = 0;
  order_ID: any = "";
  foucs: any;
  isLoading: boolean;
  color = '#0094ff';
  guidOrder: boolean;
  settings1 = {
    singleSelection: 'true',
    enableSearchFilter: true
  };

  date = new Date();
  pO_Date: any = this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2);
  delivery_Date: any = this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2);
  Shipping_Date: any = this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2);
  paymentDate: any = this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2);
  //End Member Variables
  alerts: Array<any> = [];
  constructor(private service: PurchaseOrderService,
    private LoginService: LoginService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private modalService: NgbModal) {
    this.purchaseOrderDetails = new Array<purchaseOrderDetails>();
    this.alerts.push(
      {
        id: 4,
        type: 'danger',
        message: 'Record is not updatable since it is being used...',
      });
  }
 
  //ngOnInit
  ngOnInit() {
  
   // let xx=UtilityDate.get(this.model);
   // console.log(xx);
    this.orderDetails();
    //this.getPriviledgedOffices();
    //this.scrollToBottom();
    //this.getSuppliers();
    //this.getItems();
    //this.getPayments();
  }

  
  //orderDetails 
  orderDetails() {
    this.isLoading = true;
    this.service.orderDetails()
      .subscribe(response => {
        this.order = (response.json());
        this.isLoading = false;
        //  console.log(response.json());
      });
  }
  //searchOrderDetails
  searchOrderDetails(value: string) {
    this.service.searchOrderDetails(value)
      .subscribe(response => {
        this.order = (response.json());
      });
  }
  //IfExists
  IfExists(purchase_Order_ID) {
    this.service.IfExists(purchase_Order_ID)
      .subscribe(response => {
        this.status = (response.json());
        if (this.status == true) {
          $("#alertWarning").show();
          $("#submitUpdate").prop("disabled", true);
        }
        else {
          $("#alertWarning").hide();
          $("#submitUpdate").prop("disabled", false);
        }
      });
  }
  //getPriviledgedOffices
  getPriviledgedOffices() {
    this.service.getPriviledgedOffices()
      .subscribe(response => {
        this.users = (response.json());
        this.order_Envoy = this.users[0].order_Envoy;
        // console.log(this.users);
      });
  }
  
  //clearFields
  clearFields() {
    
 this.selDate =  UtilityDate.set(); 
    this.order_Envoy = 1;
    this.supplier_ID = 1;
    this.SupplierID = 0;
    this.purchase_Order_ID = 0;
    this.Office_Code = 0;
    this.PO_NO = 0;
    this.Supplier_ID = 1;
    this.contact_Person_ID = 0;
    this.payment_ID = 1;
    this.method_Id = 1;
    this.frieght_Id = 1;
    this.total_Cost = 0;
    this.total_Discount = 0;
    this.freight_Chrgs = 1;
    this.total_Amount = 0;
    this.remarks = "";
    this.item_Code = 0;
    this.Quantity = 1;
    this.Discount_Rate = 0;
    this.purchaseOrderDetails = [];
    /*this.users = [];
    this.suppliers = [];
    this.contacts = [];
    this.items = [];
    this.payments = [];
    this.supplier = [];*/
    this.guid = UUID.UUID();
    $("#alertWarning").hide();
    $("#submitAdd").prop("disabled", false);


    this.getItems();
    this.getPayments();
    this.frieghtChange();
    this.scrollToBottom();
    this.getPriviledgedOffices();
    this.mode = true;
    $("#alertWarning").hide();
    $("#alertWarning").prop("disabled", true);

  }
  //getSuppliers
  getSuppliers() {
    this.service.getSuppliers()
      .subscribe(response => {
        this.suppliers = this.getDropdownList(response.json(), "supplier_ID", "supplier_Name");
        this.supplier_ID.push({
          id: this.suppliers[0].id,
          text: this.suppliers[0].text
        });
        //getContacts
        this.service.getContacts(this.supplier_ID)
          .subscribe(response => {
            this.contacts = response.json();
            this.contact_ID = this.contacts[0].contact_ID;
            //  console.log(response.json());
          });
      });
  }
  //changeSupplier
  changeSupplier(e: any) {
    this.supplier_ID = e.value;
    this.service.getContacts(this.supplier_ID)
      .subscribe(response => {
        this.contacts = response.json();
        this.contact_ID = this.contacts[0].contact_ID;
        console.log(response.json());
      });
  }
  //getItems  
  getItems() {
    this.service.getItems()
      .subscribe(response => {
        this.items = this.getDropdownList(response.json(), "item_Code", "item_Name");
        this.item_Code = this.items[2].id;
        this.item_Name = this.items[2].text;
        //getUnitPrice
        this.service.getUnitPrice(this.item_Code)
          .subscribe(response => {
            this.unitPrices = (response.json());
            this.unit_Price = this.unitPrices[0].unit_Price;
            //console.log(response.json());
          });
      });
  }
  //changeItem
  changeItem(e: any) {
    this.item_Code = e.value;
    this.service.getUnitPrice(this.item_Code)
      .subscribe(response => {
        this.unitPrices = (response.json());
        this.unit_Price = this.unitPrices[0].unit_Price;
        this.item_Name = this.unitPrices[0].item_Name;
        //  console.log(response.json());
      });
  }
  //getPayments
  getPayments() {
    this.service.getPayments()
      .subscribe(response => {
        this.payments = (response.json());
        // console.log(response.json());
      });
  }
  //showCreate
  showCreate() {
    this.mode = false;
    this.clearFields();
    $("#pnlAdd").show();
    $("#pnlDetail").hide();
    $("#submitAdd").show();
    $("#submitUpdate").hide();
  }
  //hideGrid
  hideGrid() {
    // this.ngOnInit();
    this.mode = true;
    $("#pnlAdd").hide();;
    $("#pnlDetail").show();
    $("#submitAdd").hide();
    $("#submitUpdate").show();
    $("#submitAdd").prop("disabled", false);
  }
  //editMode
  edit() {
    this.mode = true;
    $("#pnlAdd").show();
    $("#pnlDetail").hide();
    $("#submitAdd").hide();
    $("#submitUpdate").show();
    $("#submitAdd").prop("disabled", false);
  }
  //Total Cost
  TotalCost() {
    var total_Cost = 0;
    if (this.purchaseOrderDetails.length > 0) {
      for (var count = 0; count < this.purchaseOrderDetails.length; count++) {
        total_Cost += this.purchaseOrderDetails[count].unit_Price * this.purchaseOrderDetails[count].quantity;
      }
    }

    return total_Cost.toFixed(2);;
  }
  //Total Discount
  TotalDiscount() {
    var total_Discount = 0;
    if (this.purchaseOrderDetails.length > 0) {
      for (var count = 0; count < this.purchaseOrderDetails.length; count++) {
        total_Discount += ((this.purchaseOrderDetails[count].unit_Price * this.purchaseOrderDetails[count].quantity) * this.purchaseOrderDetails[count].discount_Rate / 100);
      }
    }
    return total_Discount.toFixed(2);;
  }
  //Total Amount
  TotalAmount() {
    var total_Amount = 0;
    if (this.purchaseOrderDetails.length > 0) {
      for (var count = 0; count < this.purchaseOrderDetails.length; count++) {
        total_Amount += ((this.purchaseOrderDetails[count].unit_Price * this.purchaseOrderDetails[count].quantity) - ((this.purchaseOrderDetails[count].unit_Price * this.purchaseOrderDetails[count].quantity) * this.purchaseOrderDetails[count].discount_Rate / 100));
      }
      if (this.freight_Chrgs != "")

        total_Amount += parseFloat(this.freight_Chrgs);

    }
    return total_Amount.toFixed(2);
  }
  //changeQuantity
  changeQuantity(Quantity) {
    if (Quantity <= 0) {
      this.Quantity = 1;
    }
  }
  //changeQuantity
  changeQuantityEdit(i: purchaseOrderDetails, quantity) {
    if (quantity <= 0) {
      i.quantity = 1;
    }
  }
  //changeDiscountRate
  changeDiscountRate(Discount_Rate) {
    if (Discount_Rate > 100) {
      this.Discount_Rate = 100;
    }
    else if (Discount_Rate <= 0) {
      this.Discount_Rate = 0;
    }
  }
  //changeDiscountRateEdit
  changeDiscountRateEdit(i: purchaseOrderDetails, discount_Rate) {
    if (discount_Rate > 100) {
      i.discount_Rate = 100;
    }
    else if (discount_Rate <= 0) {
      i.discount_Rate = 0;
    }
  }
  // convert dropdown lables
  getDropdownList(arr: any[], valuetxt: any, displaytxt: any): any {
    let ar: Array<any> = [];
    if (arr != null) {
      arr.forEach(
        function (obj) {

          ar.push({
            id: obj[valuetxt],
            text: obj[displaytxt]
          });

        });
    }
    return ar;
  }
  //frieghtChange
  frieghtChange = function () {
    var PaymentTerm = this.frieght_Id;
    if (PaymentTerm == 1) {
      $("#freightlbl").hide();
      $("#freighttxt").hide();
      //document.getElementById("freightlbl").style.display = "none";
      //document.getElementById("freighttxt").style.display = "none";
      this.freight_Chrgs = 0;
    }
    else {
      $("#freightlbl").show();
      $("#freighttxt").show();
      //document.getElementById("freightlbl").style.display = "block";
      //document.getElementById("freighttxt").style.display = "block";
      this.freight_Chrgs = 1;
    }

  }
  //paymentTermChange
  paymentTermChange = function () {
    var PaymentTerm = this.payment_ID
    var today = new Date();
    var millies = Date.parse(this.today);
    var newDate = new Date();
    var dd = 0;
    var mm = 0;
    var yyyy = 0;

    if (PaymentTerm == 1) {

      dd = today.getDate();
      mm = today.getMonth() + 1;//January is 0!
      yyyy = today.getFullYear();
      if (dd < 10) { this.dd = '00' + dd }
      if (mm < 10) { this.mm = '00' + mm }
      this.paymentDate = mm + '/' + dd + '/' + yyyy;
      // alert(this.paymentDate);
      document.getElementById("paymentDateLbl").style.display = "none";
      document.getElementById("paymentDateTxt").style.display = "none";

    } else if (PaymentTerm == 2) {

      newDate.setDate(newDate.getDate() + 10);
      dd = newDate.getDate();
      mm = newDate.getMonth() + 1;//January is 0!
      yyyy = newDate.getFullYear();
      if (dd < 10) { this.dd = '00' + dd }
      if (mm < 10) { this.mm = '00' + mm }
      this.paymentDate = mm + '/' + dd + '/' + yyyy;
      // alert(this.paymentDate);
      document.getElementById("paymentDateLbl").style.display = "block";
      document.getElementById("paymentDateTxt").style.display = "block";
    }
    else if (PaymentTerm == 3) {

      newDate.setDate(newDate.getDate() + 15);
      this.dd = newDate.getDate();
      this.mm = newDate.getMonth() + 1;//January is 0!
      this.yyyy = newDate.getFullYear();
      if (dd < 10) { this.dd = '00' + dd }
      if (mm < 10) { this.mm = '00' + mm }
      this.paymentDate = mm + '/' + dd + '/' + yyyy;
      //alert(this.paymentDate);
      document.getElementById("paymentDateLbl").style.display = "block";
      document.getElementById("paymentDateTxt").style.display = "block";
    }
    else if (PaymentTerm == 4) {

      newDate.setDate(newDate.getDate() + 20);
      this.dd = newDate.getDate();
      this.mm = newDate.getMonth() + 1;//January is 0!
      this.yyyy = newDate.getFullYear();
      if (dd < 10) { this.dd = '00' + dd }
      if (mm < 10) { this.mm = '00' + mm }
      this.paymentDate = mm + '/' + dd + '/' + yyyy;
      //alert(this.paymentDate);
      document.getElementById("paymentDateLbl").style.display = "block";
      document.getElementById("paymentDateTxt").style.display = "block";
    } else {
      document.getElementById("paymentDateLbl").style.display = "none";
      document.getElementById("paymentDateTxt").style.display = "none";
      this.paymentDate = "";
    }
  }
  //changeFreight
  changeFreight(freight_Chrgs) {
    if (freight_Chrgs <= 0)
      this.freight_Chrgs = 1;
  }
  //ShipMethodList
  ShipMethodList = [
    { "method_Id": 1, "method_Name": "Airborne" }
    , { "method_Id": 2, "method_Name": "DHL" }
    , { "method_Id": 3, "method_Name": "UPS" }
    , { "method_Id": 4, "method_Name": "Postal Mail" }
    , { "method_Id": 5, "method_Name": "Other" }]
  //FrieghtTermsList
  FrieghtTermsList = [
    { "frieght_Id": 1, "frieght_Name": "No Charge" }
    , { "frieght_Id": 2, "frieght_Name": "FOB" }
  ]

  onDateChanged(event: IMyDateModel) {
    // Update value of selDate variable
    this.pO_Date=event.formatted;
    console.log(event.formatted);

}
  //getDetailsByID
  getDetailsByID(purchase_Order_ID, content) {
    this.open(content);
    //this.edit();
    this.mode = false;
    this.IfExists(purchase_Order_ID);
    this.service.getDetailsByID(purchase_Order_ID)
      .subscribe((o: purchaseOrder) => {
        this.purchase_Order_ID = o.purchase_Order_ID;
        this.pO_Date = o.pO_Date;
        
        let d=UtilityDate.set(this.pO_Date.replace("-","/").replace("-","/")); 
        console.log(d);
        this.selDate =  d;
  
        let element: HTMLElement = document.getElementsByClassName('btnpicker')[0] as HTMLElement;
        element.click();
        element.click();

        this.order_Envoy = o.order_Envoy;
        this.getSuppliers();
        this.supplier_ID = o.supplier_ID;
        this.contact_Person_ID = o.contact_Person_ID;
        this.changeSupplier(o.supplier_ID);
        this.payment_ID = o.payment_ID;
        this.remarks = o.remarks;
        this.paymentDate = o.paymentDate;
        this.delivery_Date = o.delivery_Date;
        this.shipping_Method = o.shipping_Method;
        this.freight_Term = o.freight_Term;
        this.freight_Chrgs = o.freight_Chrgs;
        this.total_Amount = o.total_Amount;
        this.total_Discount = o.total_Discount;
        this.purchaseOrderDetails = o.purchaseOrderDetails;
        this.changeSupplier(this.supplier_ID);
        this.changeMode(0, this.purchaseOrderDetail, true)
      });
  }

 
  //IfExists
  guidExist(guid: any) {
    this.service.guidExist(guid)
      .subscribe(response => {
        this.guidOrder = (response.json());
      });
  }
  //addGrid
  addGrid(item_Code: any, item_Name: any, Unit_Price: any, Quantity: any, Discount_Rate: any) {
    if (Unit_Price != 0) {
      if (item_Name != null) {
        if (Quantity > 0) {
          var flag = false;
          if (this.purchaseOrderDetails.length > 0) {
            for (var count = 0; count < this.purchaseOrderDetails.length; count++) {
              if (this.purchaseOrderDetails[count].item_Code == item_Code) {
                flag = true;
                break;
              }
            }
          }
          if (flag == false) {
            this.purchaseOrderDetails.push(new purchaseOrderDetails(0, 0, item_Code, item_Name, Unit_Price, Quantity, (Unit_Price * Quantity), Discount_Rate, ((Quantity) * (Unit_Price) * (Discount_Rate) / 100), ((Quantity) * (Unit_Price) - ((Quantity) * (Unit_Price) * (Discount_Rate) / 100)), 0));
            this.editMode = false;
          } else {
            alert("Already Exists");
          }
        }
        else {
          alert("- Qty is required.Qty not be zero and should be numeric.");
        }
      } else {
        alert("Item is Required.");
      }
    } else {
      alert("unit price should be greater then 0.");
    }
    $("#txt").focus();
    this.scrollToBottom();

  }
  //changeMode
  changeMode(idx: any, i: purchaseOrderDetails, Mode: any) {
    var flag = false;
    if (this.purchaseOrderDetails.length > 0) {
      for (var count = 0; count < this.purchaseOrderDetails.length; count++) {
        if (this.purchaseOrderDetails[count].item_Code == i.item_Code && idx != count) {
          flag = true;
          break;
        }
      }
    }
    if (Mode == 0) {
      if (i.unit_Price != 0) {
        if (flag == false) {
          if (i.quantity > 0) {
            i.edit_Mode = false;
            i.purchase_Cost = (i.unit_Price * i.quantity);
            i.discount_Amount = ((i.quantity) * (i.unit_Price) * (i.discount_Rate) / 100);
            i.net_Amount = ((i.quantity) * (i.unit_Price) - ((i.quantity) * (i.unit_Price) * (i.discount_Rate) / 100));
          } else {
            alert("Quantity should be greater then 0");
          }
        } else {
          alert("Already Exists");
        }
      } else {
        alert("unit price should be greater then 0.");
      }
    }
    else if (Mode == 2) {
      this.purchaseOrderDetails.splice(idx, 1);
    }
    else {
      console.log(i);
      i.edit_Mode = true;
    }
  }
  //updateItem  
  updateItem(i: purchaseOrderDetails, item_Code: any, item_Name: any, unit_Price: any) {
    i.item_Code = item_Code;
    i.item_Name = item_Name;
    i.unit_Price = unit_Price;

  }
  //saveOrder
  saveOrder(purchase_Order_ID: any, PO_Date: any, Office_Code: any, PO_NO: any,
    order_Envoy: any, Approved_By_ID: any, isApproved: any, supplier_ID: any,
    contact_Person_ID: any, delivery_Date: any, Shipping_Date: any,
    method_Id: any, payment_ID: any, frieght_Id: any, Total_Cost: any,
    Total_Discount: any, Pre_Tax_Amount: any, Total_Tax: any, freight_Chrgs: any,
    Total_Amount: any, remarks: any, Reorder_ID: any, Order_Type: any, paymentDate: any,
    Voucher_ID: any, Pay_Voucher_ID: any, Cancel: any, mode: any, POGUID: any, Customer_ID: any,
    C_Contact_Person_ID: any, Requisition_ID: any, Day_Id: any, IsServiceInvoice: any) {

    if (!this.guidExist(this.guid)) {
      if (Total_Amount > 0) {
        var order = new purchaseOrder(purchase_Order_ID,
          PO_Date, Office_Code, PO_NO, order_Envoy,
          1, 1, supplier_ID,
          contact_Person_ID, delivery_Date, Shipping_Date,
          method_Id, payment_ID, frieght_Id,
          Total_Cost, Total_Discount, Pre_Tax_Amount,
          Total_Tax, freight_Chrgs, Total_Amount,
          remarks, Reorder_ID, Order_Type, paymentDate, 0, 0, false, this.mode,
          this.guid, null, null, 1, 0,
          false, this.purchaseOrderDetails);

        if (this.mode != 0) {
          this.purchaseOrderDetails[0].edit_Mode = true;
        }
        this.service.saveOrder(order).then(
          (response) => {
            this.orderDetails();
            console.log(response);
          },
          (error) => console.log(error))
        this.hideGrid();
      }
      else {
        alert("- Order should be greater then 0.");
      }
    }
    else { alert("- Error: Already exists."); }
  }
  //updateOrder
  updateOrder(purchase_Order_ID: any, PO_Date: any, Office_Code: any, PO_NO: any,
    order_Envoy: any, Approved_By_ID: any, isApproved: any, supplier_ID: any,
    contact_Person_ID: any, delivery_Date: any, Shipping_Date: any,
    method_Id: any, payment_ID: any, frieght_Id: any, Total_Cost: any,
    Total_Discount: any, Pre_Tax_Amount: any, Total_Tax: any, freight_Chrgs: any,
    Total_Amount: any, remarks: any, Reorder_ID: any, Order_Type: any, paymentDate: any,
    Voucher_ID: any, Pay_Voucher_ID: any, Cancel: any, mode: any, POGUID: any, Customer_ID: any,
    C_Contact_Person_ID: any, Requisition_ID: any, Day_Id: any, IsServiceInvoice: any) {

    if (!this.guidExist(this.guid)) {
      if (Total_Amount > 0) {
        var order = new purchaseOrder(purchase_Order_ID,
          PO_Date, Office_Code, PO_NO, order_Envoy,
          1, 1, supplier_ID,
          contact_Person_ID, delivery_Date, Shipping_Date,
          method_Id, payment_ID, frieght_Id,
          Total_Cost, Total_Discount, Pre_Tax_Amount,
          Total_Tax, freight_Chrgs, Total_Amount,
          remarks, Reorder_ID, Order_Type, paymentDate, 0, 0, false, this.mode,
          this.guid, null, null, 1, 0,
          false, this.purchaseOrderDetails);

        if (this.mode != 0) {
          this.purchaseOrderDetails[0].edit_Mode = true;
        }
        this.service.updateOrder(order).then(
          (response) => {
            this.orderDetails();
            console.log(response);
          },
          (error) => console.log(error))
        this.hideGrid();
      }
      else {
        alert("- Order should be greater then 0.");
      }
    }
    else { alert("- Error: Already exists."); }
  }
  //ngAfterViewChecked
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  //scrollToBottom
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  //hotkeys
  hotkeys(event) {
    //alert(event.keyCode);
    //if (event.keyCode == 65) {
    //    alert("A pressed");
    //    this.showCreate();
    // }
  }
  // open modal
  open(content) {

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.clearFields();
  }
  //getDismissReason
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }// end of modal
}





