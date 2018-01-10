import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import { Select2Module } from 'ng2-select2';
@NgModule({
    imports: [CommonModule, BlankPageRoutingModule, Select2Module],
    declarations: [BlankPageComponent]
})
export class BlankPageModule {}
