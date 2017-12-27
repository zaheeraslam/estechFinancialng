import { saleInvoiceDetails } from './saleInvoiceDetails';
export class saleInvoice {
    constructor(
        public sale_Invoice_ID: any,
        public invoice_Date: any,       
        public office_Code: any,
        public customer_ID: any,
        public sale_Order_ID: any,
        public total_Cost: any,
        public total_Discount: any,
        public total_Tax: any,
        public freight_Chrgs: any,
        public total_Amount: any,
        public paidAmount: any,
        public balanceAmount: any,      
        public remarks: any,
        public sIGUID: any,
        public saleInvoiceDetails: saleInvoiceDetails[]
    ) { }
}


