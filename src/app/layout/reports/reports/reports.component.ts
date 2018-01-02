import { Component, OnInit, HostListener } from '@angular/core';

import { DomSanitizer } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { ReportService, LoginService } from '../../../shared';


@Component({
    selector: 'app-reports',
    host: { 'window:keydown': 'hotkeys($event)' },
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    private item: Array<any> = [];
    AuthKey: any;
    offices: any[];
    customers: any[];
    suppliers: any[];
    cities: any[];
    districts: any[];
    customerCategories: any[];
    items: any[];
    itemCategories: any[];
    subCategories: any[];
    QueryString: any;
    ViewerPath: any = '';
    url: any;
    // remaining declalartions
    selectedofficeCode: any[] = [];
    selectedcityCode: any[] = [];
    officeCode: any[] = [];
    //cityCode: any[] = [];
    customerId: any[] = [];
    supplierId: any[] = [];
    districtCode: any[] = [];
    customerCategoryCode: any[] = [];
    itemCode: any[];
    categoryCode: any[];
    subCategoryCode: any[];


    params;
    reportId;
    reportCriteria: any;


    customerShow: boolean = false;
    supplierShow: boolean = false;
    saleOrderShow: boolean = false;
    purchaseOrderShow: boolean = false;
    invoiceShow: boolean = false;
    customerCategoryShow: boolean = false;
    districtShow: boolean = false;
    cityShow: boolean = false;
    itemShow: boolean = false;
    itemCategoryShow: boolean = false;
    subCategoryShow: boolean = false;
    toDateShow: boolean = true;
    exportToPDF: boolean = true;
    exportToExcel: boolean = false;
    iframeShow: boolean = true;
    criteriaShow: boolean = false;
    fromdate: any;
    todate: any;

    settings = {
        enableCheckAll: 'false',
        limitSelection: '10',
        enableSearchFilter: true
    };
    settings1 = {
        singleSelection: 'true',
        enableSearchFilter: true
    };
    // end of declarartions

    constructor(private service: ReportService, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private loginService: LoginService) {
        this.AuthKey = '';
        this.fromdate = '2017-01-01';
        this.todate = '2017-12-18';
        this.ViewerPath = this.loginService.getSession('ViewerPath');       
    }

    ngOnInit() {
        this.ViewerPath = this.loginService.getSession('ViewerPath');        
        this.exportToPDF = true;
        this.exportToExcel = false;
        // tslint:disable-next-line:prefer-const
        this.route.queryParams
            .subscribe(params => {
                this.params = params;
                this.criteriaSets();
                console.log(this.params.cset);
            });

        this.service.getOffice()
            .subscribe(response => {
                this.offices = this.getDropdownList(response.json(), 'officE_CODE', 'officE_NAME');
               // console.log(this.offices);
            });

        this.service.getCustomer()
            .subscribe(response => {
                this.customers = this.getDropdownList(response.json(), 'customer_ID', 'customer_Name');
            });

        this.service.getCustomerCategory()
            .subscribe(response => {
                this.customerCategories = this.getDropdownList(response.json(), 'customerCategoryId', 'customerCategoryName');
            });
        this.service.getSupplier()
            .subscribe(response => {
                this.suppliers = this.getDropdownList(response.json(), 'supplier_ID', 'supplier_Name');
            });
        this.service.getCity()
            .subscribe(response => {
                this.cities = this.getDropdownList(response.json(), 'citY_CODE', 'name');
            });
        this.service.getDistricts()
            .subscribe(res => {
                this.districts = this.getDropdownList(res.json(), 'districT_CODE', 'districT_NAME');
            });
        this.service.getItem()
            .subscribe(res => {
                this.items = this.getDropdownList(res.json(), 'item_Code', 'item_Name');
            });
        this.service.getItemCategory()
            .subscribe(res => {
                this.itemCategories = this.getDropdownList(res.json(), 'category_Code', 'category_Name');
            });
        this.service.getItemSubCategory()
            .subscribe(res => {
                this.subCategories = this.getDropdownList(res.json(), 'subCategory_Code', 'subCategory_Name');
            });

    }
    getDropdownList(arr: any[], valuetxt: any, displaytxt: any): any {
        let ar: Array<any> = [];
        if (arr != null) {
            arr.forEach(
                function (obj) {

                    ar.push({
                        id: obj[valuetxt],
                        itemName: obj[displaytxt]
                    });

                });
        }
        return ar;
    }
    criteriaSets() {
        if (this.params.cset == "CSSale") {
            this.customerShow = true;
            //this.saleOrderShow= true;
        } else if (this.params.cset == "CSCustomer") {
            this.customerShow = true;
            this.customerCategoryShow = true;
            this.districtShow = true;
            this.cityShow = true;
        } else if (this.params.cset == "CSPurchase") {
            this.supplierShow = true;
            //this.purchaseOrderShow = true;
            //this.invoiceShow = true;
        } else if (this.params.cset == "CSSupplier") {
            this.supplierShow = true;
            this.districtShow = true;
            this.cityShow = true;
        } else if (this.params.cset == "CSPartyLedger") {
            this.supplierShow = true;
            this.customerShow = true;
        }
        else if (this.params.cset == "CSItemLedger") {
            this.itemCategoryShow = true;
            this.subCategoryShow = true;
            this.itemShow = true;
        } else if (this.params.cset == "CSInventory") {
            this.itemCategoryShow = true;
            this.subCategoryShow = true;
            this.itemShow = true;
        } else if (this.params.cset == "CSISupplierAging") {
            this.toDateShow = false;
            this.supplierShow = true;
        }
        else if (this.params.cset == "CSICustomerAging") {
            this.toDateShow = false;
            this.customerShow = true;
        }
        else if (this.params.cset == "CSDispatch") {
            this.districtShow = true;
            this.cityShow = true;
        }
    }
    onCitySelect(item: any) {
        //this.cityCode.push(item.id);
    }
    OnCityDeSelect(item: any) {
        // tslint:disable-next-line:prefer-const
        //let tmpCity: any[];
        //alert( this.cityCode[0].id);
        //for (let i = 0; i < this.cityCode.length; i++) {
        // if (this.cityCode[i].id == item.id) {
        //  console.log(this.cityCode[i].id);
        // tmpCity.push(this.cityCode[i].id);

        // }
        // }
        //this.cityCode = tmpCity;
        //console.log(this.cityCode);
    }
    submit(report) {
        console.log(report);
        this.reportCriteria = report;

        this.post();

    }
    post() {
        this.reportId = this.params.pageId;
        let fcId = -1;
        //alert(this.reportId);
        const body = new FormData();
        body.append('ReportId', this.reportId);
        body.append('ReportCriteria', JSON.stringify(this.reportCriteria));
        const req = this.service.toDatabase(body)
            .subscribe((val) => {
                fcId = val.json();
                this.iframeShow = false;
                this.criteriaShow = true;
                // tslint:disable-next-line:quotemark
                console.log("POST call successful value returned in body", fcId);
            },
            response => {
                // tslint:disable-next-line:quotemark
                console.log(" call in error", response);
            },
            () => {

                this.QueryString = '?pageId=' + this.reportId + '&fcId=' + fcId + '&CSet=' + this.params.cset + '&AuthKey=' + this.params.authKey + '';
                this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.ViewerPath + this.QueryString);

                // tslint:disable-next-line:quotemark
                console.log("The POST observable is now completed.");
            });



    }
    //for crieria page
    backToCriteria() {
        this.iframeShow = true;
        this.criteriaShow = false;
        
    }
    // for bakl navigation
    backNavigation() {
        this.customerShow = false;
        this.saleOrderShow = false;
        this.customerCategoryShow = false;
        this.districtShow = false;
        this.cityShow = false;
        this.supplierShow = false;
        this.purchaseOrderShow = false;
        this.invoiceShow = false;
        this.itemCategoryShow = false;
        this.subCategoryShow = false;
        this.itemShow = false;
        this.toDateShow = true;
       
        //this.router.navigate(['/dahboard']);
    }
    // for hot keys
    @HostListener('window:keydown', ['$event'])
    hotkeys($event) {
        // alert($event.keyCode);
        if ($event.ctrlKey && $event.keyCode == 'S'.charCodeAt(0)) {
            $event.preventDefault();
            //your saving code
            this.backNavigation();
        }

    }
    ExportPDFSelect(opt: string) {

        if (opt == "pdf") {

            this.exportToPDF = true;
            this.exportToExcel = false;
        }
        if (opt == "excel") {
            this.exportToPDF = false;
            this.exportToExcel = true;
        }

    }

}
