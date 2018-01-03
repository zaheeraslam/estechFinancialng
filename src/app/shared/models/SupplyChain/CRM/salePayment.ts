import { customerPaymentDetails } from './customerPaymentDetails';
export class salePayment {
    constructor(
        public sale_Payment_ID: any,
        public payment_Date: any,
        public payment_NO: any,       
        public office_Code: any,
        public customer_ID: any,
        public total_Cost: any,
        public total_Discount: any,
        public total_Tax: any,
        public freight_Chrgs: any,
        public total_Amount: any,
        public balance_Amount: any,
        public paid_Amount: any,
        public remarks: any,
        public sPGUID: any,
        public customerPaymentDetails: customerPaymentDetails[]
    ) { }
}


