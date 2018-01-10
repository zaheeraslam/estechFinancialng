import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTabDirective } from './new-tab.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NewTabDirective],
  exports:[NewTabDirective]
})
export class DirectiveModule { }
