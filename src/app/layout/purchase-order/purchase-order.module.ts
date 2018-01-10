import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Select2Module } from 'ng2-select2';
import { SharedPipesModule, DirectiveModule } from '../../shared';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  imports: [
    CommonModule,
    Select2Module,
    MyDatePickerModule,
    DirectiveModule,
    FormsModule,
    AngularMultiSelectModule,
    SharedPipesModule,
    NgbModule.forRoot(),
    PurchaseOrderRoutingModule
  ],
  declarations: [PurchaseOrderComponent]
})
export class PurchaseOrderModule { }
