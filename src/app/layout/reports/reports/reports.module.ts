import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { PageHeaderModule } from '../../../shared/index';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule
    , PageHeaderModule
  ],
  declarations: [ReportsComponent],
  exports : [ReportsComponent]
})
export class ReportsModule { }
