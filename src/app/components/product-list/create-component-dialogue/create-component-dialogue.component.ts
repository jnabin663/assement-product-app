import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ProductData } from 'src/app/mock/interfaces/product-data';
import {
  ConfirmationDialogueComponent,
  ConfirmDialogModel,
} from 'src/app/shared/confirmation-dialogue/confirmation-dialogue.component';

@Component({
  selector: 'app-create-component-dialogue',
  templateUrl: './create-component-dialogue.component.html',
  styleUrls: ['./create-component-dialogue.component.css'],
})
export class CreateComponentDialogueComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateComponentDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductData,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {}

  inputData: any = {};
  unsaveAlertMsg: string = '';
  confirmActionMsg: string = '';

  ngOnInit(): void {
    this.inputData = JSON.parse(JSON.stringify(this.data));
    this.unsaveAlertMsg = this.translate.instant('savedDataWillBeLost');
    this.confirmActionMsg = this.translate.instant('confirmAction');
  }

  get isValidProduct() {
    return (
      this.inputData.brand &&
      this.inputData.code &&
      this.inputData.name &&
      this.inputData.price
    );
  }

  onSaveClick(elementRef: any[]) {
    if (this.isValidProduct) {
      this.data.brand = this.inputData.brand;
      this.data.name = this.inputData.name;
      this.data.description = this.inputData.description;
      this.data.price = this.inputData.price;
      this.data.code = this.inputData.code;
      this.dialogRef.close(this.data);
    } else {
      elementRef.forEach((x) => x.click());
    }
  }

  onCancelCLick() {
    if (JSON.stringify(this.data) != JSON.stringify(this.inputData)) {
      const dialogData = new ConfirmDialogModel(this.confirmActionMsg, this.unsaveAlertMsg);

      const dialogRef = this.dialog.open(ConfirmationDialogueComponent, {
        maxWidth: '400px',
        data: dialogData,
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((dialogResult) => {
        //this.result = dialogResult;
        if (dialogResult) {
          dialogRef.close();
          this.dialogRef.close();
        } else {
          dialogRef.close();
        }
      });
    } else {
      this.dialogRef.close();
    }
  }
}
