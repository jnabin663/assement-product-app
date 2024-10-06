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

  inputData: any = {};

  ngOnInit(): void {
    this.inputData = JSON.parse(JSON.stringify(this.data))
  }

  get isValidProduct(){
    return this.inputData.brand && this.inputData.code && this.inputData.name && this.inputData.price;
  }

  onSaveClick(elementRef: any[]){
    if(this.isValidProduct) {
      this.data.brand = this.inputData.brand;
      this.data.name = this.inputData.name;
      this.data.description = this.inputData.description;
      this.data.price = this.inputData.price;
      this.data.code = this.inputData.code;
      this.dialogRef.close(this.data);
    } else {
      elementRef.forEach(x => x.click());
    }
  }

}
