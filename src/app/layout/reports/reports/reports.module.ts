import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { PageHeaderModule } from '../../../shared/index';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMultiSelectModule,
    ReportsRoutingModule
    , PageHeaderModule
  ],
  declarations: [ReportsComponent],
  exports : [ReportsComponent]
})
export class ReportsModule { }
