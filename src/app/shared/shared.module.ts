import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonTableComponent } from './common-table/common-table.component';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    CommonTableComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule
  ],
  exports: [CommonTableComponent, MaterialModule]
})
export class SharedModule { }
