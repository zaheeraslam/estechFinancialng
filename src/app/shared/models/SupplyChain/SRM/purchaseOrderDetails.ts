export class purchaseOrderDetails {
    constructor(
        
                public pO_Detail_ID: any,
                public purchase_Order_ID: any,                
                public item_Code: any, 
                public item_Name: any, 
                public unit_Price: any,
                public quantity: any,
                public purchase_Cost: any,                
                public discount_Rate: any,
                public discount_Amount: any,
                public net_Amount: any ,
                public edit_Mode:any
                ) { }
}

