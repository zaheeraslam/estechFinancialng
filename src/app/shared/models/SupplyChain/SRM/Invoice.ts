import { PurchaseInvoiceDetail } from './PurchaseInvoiceDetail';
export class Invoice {
    constructor(
        public purchase_Invoice_ID: any,
        public invoice_Date: any,
        public invoice_NO: any,       
        public office_Code: any,
        public supplier_ID: any,
        public purchase_Order_ID: any,
        public total_Cost: any,
        public total_Discount: any,
        public total_Tax: any,
        public freight_Chrgs: any,
        public total_Amount: any,
        public balanceAmount: any,
        public paidAmount: any,
        public remarks: any,
        public pIGUID: any,
        public isUpdate : any ,
      /*public voucher_ID: any,
        public pay_Voucher_ID: any,
        public cancel: any,
        public paymentCancel: any,
        public creation_Date: any,
        public created_By: any,
        public modified_Date: any,
        public modified_By: any,
        public exchange: any,
      
        public inStockCredit: any,
        public advanceAmount: any,*/
        public PurchaseInvoiceDetail: PurchaseInvoiceDetail[]
    ) { }
}


