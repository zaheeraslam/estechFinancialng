import { DirectiveModule } from '../../directives/directive.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatComponent } from './stat.component';



@NgModule({
    imports: [CommonModule, DirectiveModule],
    declarations: [StatComponent],
    exports: [StatComponent]
})
export class StatModule {}
