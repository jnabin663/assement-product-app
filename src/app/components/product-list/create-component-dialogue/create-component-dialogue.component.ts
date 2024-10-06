import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductData } from 'src/app/mock/interfaces/product-data';

@Component({
  selector: 'app-create-component-dialogue',
  templateUrl: './create-component-dialogue.component.html',
  styleUrls: ['./create-component-dialogue.component.css']
})
export class CreateComponentDialogueComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateComponentDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductData,
  ) { }

  ngOnInit(): void {
  }

  get isValidProduct(){
    return this.data.brand && this.data.code && this.data.name && this.data.price;
  }

  onSaveClick(elementRef: any[]){
    if(this.isValidProduct) {
      this.dialogRef.close(this.data);
    } else {
      elementRef.forEach(x => x.click());
    }
  }

}
