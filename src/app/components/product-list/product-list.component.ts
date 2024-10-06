import { Component, OnInit } from '@angular/core';
import { TableBtn, TableColumn } from '../../shared/interfaces';
import { ProductData } from '../../mock/interfaces/product-data';
import { createNewProductData } from '../../mock/functions/mock-data';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponentDialogueComponent } from './create-component-dialogue/create-component-dialogue.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  introText = 'Button actions and payloads come here in textual form';
  columns: TableColumn[] = [];
  buttons: TableBtn[] = [];
  data: ProductData[] = [];
  totalPrice: number = 0;
  footer: string = '';

  constructor(
    private translate: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.data = Array.from({ length: 100 }, (_, k) =>
      createNewProductData(k + 1)
    );

    this.columns = [
      {
        columnDef: 'name',
        header: this.translate.instant('tabeHeaderName'),
        cell: (element: ProductData) => `${element.name}`,
      },
      {
        columnDef: 'code',
        header: this.translate.instant('tabeHeaderCode'),
        cell: (element: ProductData) => `${element.code}`,
      },
      {
        columnDef: 'brand',
        header: this.translate.instant('tabeHeaderBrand'),
        cell: (element: ProductData) => `${element.brand}`,
      },
      {
        columnDef: 'price',
        header: this.translate.instant('tabeHeaderPrice'),
        cell: (element: ProductData) => `${element.price}$`,
      },
      {
        columnDef: 'description',
        header: this.translate.instant('tabeHeaderDescription'),
        cell: (element: ProductData) => `${element.description ? element.description : ''}`,
      },
    ];

    this.data.forEach((product: ProductData) => {
      this.totalPrice = this.totalPrice + product.price;
    });
    this.footer = `Total price: ${this.totalPrice}$`;
  }

  applyFilter(filteredData: ProductData[]) {
    this.totalPrice = 0;
    filteredData.forEach((product: ProductData) => {
      this.totalPrice = this.totalPrice + product.price;
    });
    this.footer = `Total price: ${this.totalPrice}$`;
  }

  buttonClick(result: string[]) {
    this.introText = `action: ${result[0]}, payload ${result[1]}`;
  }

  openCreateProductDialogue() {
    let productData = {}
    const dialogRef = this.dialog.open(CreateComponentDialogueComponent, {
      width: '500px',
      data: productData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: ProductData) => {
      result.id = (this.data.length + 1).toString();
      this.data = [result, ...this.data];
    });
  }
}
