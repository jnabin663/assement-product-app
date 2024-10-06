import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonTableComponent } from './common-table/common-table.component';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationDialogueComponent } from './confirmation-dialogue/confirmation-dialogue.component';



@NgModule({
  declarations: [
    CommonTableComponent,
    ConfirmationDialogueComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule
  ],
  exports: [CommonTableComponent, MaterialModule, ConfirmationDialogueComponent],
  entryComponents: [ConfirmationDialogueComponent]
})
export class SharedModule { }
