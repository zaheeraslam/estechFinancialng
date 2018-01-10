import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService, LoginService } from '../../../shared';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
    pushRightClass: string = 'push-right';
    //  my declerations
    
    logedInUserID: any = 1;
    
        header_Id: any;
        header_Name: any;
        page_URL: any;
        sort_Order: any;
        img_URL: any;
        page_URL_New: any;
    
        sub_Header_ID: any;
        sub_Header_Name: any;
        moduleColor: any;
    
        page_Code: any;
        page_Name: any;
        showinMenue: any;
        isList: any;
        isSubList: any;
        fileName: any;
        DefaultModule = 6;
        DefaultModuleName = "Supply Chain Management";
        DefaultIMG_URL = "/assets/Scripts/img/ModuleIcons/proc.png";
        DefaultModuleArray = [];
        Headers: any[];
        SubHeaders: any[];
        userPriviligedFiles: any[];
        reportURL: any;
        detail: any;
    
    
        header: any = 0;
        subHeader: any = 0;
        pageID: any = 0;
        pageURL: any = "0";
        criteriaSet: any = 0;
        reportName: any = 0;
        pageType: any = 0;
        URL: any;
        formURL: any;
        AuthKey: any = "0";
        displayName: any;
        //end of my declarations

    constructor(private translate: TranslateService, public router: Router, private service: HeaderService,  private loginService: LoginService) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
      
        localStorage.removeItem('isLoggedin');
        this.router.navigate(['/login']);
    }
    onReports() {
        ;
        this.router.navigate(['/reports']);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
    
    // my code
    ngAfterViewInit() {
        this.displayName = sessionStorage.getItem("login");
        // alert(this.displayName);
    }

    toggleMenu(dis) {
    }
    loadDefaultModule(ModuleId, ModuleName, IMG_URL) {
        this.DefaultModule = ModuleId;
        this.DefaultModuleName = ModuleName;
        this.DefaultIMG_URL = IMG_URL;
    }
    ngOnInit() {
        //getHeaders
        this.service.getHeaders(this.logedInUserID)
            .subscribe(response => {
                this.Headers = (response.json());
                // console.log(response.json());
            });
        //getSubHeaders
        this.service.getSubHeaders(this.logedInUserID)
            .subscribe(response => {
                this.SubHeaders = (response.json());
                //  console.log(response.json());
            });
        //getUserPriviligedFiles
        this.service.getUserPriviligedFiles(this.logedInUserID)
            .subscribe(response => {
                this.userPriviligedFiles = (response.json());
                //   console.log(response.json());
            });

    }

    chunk(arr, condition) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].header_ID == condition) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }
    chunkSubHead(arr, condition) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].sub_Header_ID == condition) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }
    getPageDetail(page_ID) {
       // this.onReports();
     
       // this.router.navigate(['/login']);
        this.service.getPageDetail(page_ID)
            .subscribe(response => {
                this.detail = (response.json());

                sessionStorage.setItem('page_ID', this.detail[0].page_ID);
                //sessionStorage.setItem('pageName', this.detail[0].page_Name);
                //sessionStorage.setItem('pageURL', this.detail[0].page_URL);
                //sessionStorage.setItem('header', this.detail[0].tree_Node_Code);
                //sessionStorage.setItem('subHeader', this.detail[0].sub_Tree_Node_Code);
                //sessionStorage.setItem('criteriaSet', this.detail[0].criteriaSet);K
                //sessionStorage.setItem('reportName', this.detail[0].reportName);
                this.header = this.detail[0].tree_Node_Code;
                this.subHeader = this.detail[0].sub_Tree_Node_Code;
                this.pageID = this.detail[0].page_ID;
                this.page_Name = this.detail[0].page_Name;
                this.criteriaSet = this.detail[0].criteriaSet;
                this.reportName = this.detail[0].reportName;
                this.pageURL = this.detail[0].ngPage_URL;
                this.pageType = this.detail[0].page_Type_ID;
                sessionStorage.setItem('pageType', this.detail[0].page_Type_ID);
                this.formURL = this.detail[0].url;                
                sessionStorage.setItem('pageURL', this.detail[0].ngPage_URL);
                this.reportURL = this.loginService.getSession('URL');
               // alert(this.detail[0].URL);
                this.AuthKey = this.loginService.getSession('AuthKey');
                //sessionStorage.setItem('rptURL', this.URL);
             //   sessionStorage.setItem('rptURL', this.detail[0].url);
                if (this.pageType == 1) {
                    
                    this.URL = "" + this.formURL + "hid=" + this.header + "&shid=" + this.subHeader + "&PageId=" + this.pageID + "&CSet=" + this.criteriaSet + "&NameForReport=" + this.reportName + "&AuthKey=" + this.AuthKey + "";                  
                    sessionStorage.setItem('rptURL', this.URL);
                    this.router.navigate(['/purchase-order']);
                }
                else {
                    this.URL = "" + this.reportURL + "hid=" + this.header + "&shid=" + this.subHeader + "&PageId=" + this.pageID + "&CSet=" + this.criteriaSet + "&NameForReport=" + this.reportName + "&AuthKey=" + this.AuthKey + "";
                   
                    this.router.navigate(['/reports'], { queryParams: { pageId: this.pageID, cset: this.criteriaSet, name: this.page_Name, authKey: this.AuthKey } });
                }
            }); 
    }
}
