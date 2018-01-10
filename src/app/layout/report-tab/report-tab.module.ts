import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportTabRoutingModule } from './report-tab-routing.module';
import { TabComponent } from './tab/tab.component';
//import { NewTabDirective } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    ReportTabRoutingModule
  ],
  declarations: [TabComponent]
})
export class ReportTabModule { }
