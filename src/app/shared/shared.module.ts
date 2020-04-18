import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { DropDownDirective } from './dropdown.directive';

@NgModule({
  declarations:[
    AlertComponent,
    DropDownDirective,
  ],
  imports:[
    CommonModule,
  ],
  exports:[
    CommonModule,
    AlertComponent,
    DropDownDirective
  ]
})
export class SharedModule{}
