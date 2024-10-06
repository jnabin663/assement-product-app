import { Component, OnInit } from '@angular/core';
import { TableBtn, TableColumn } from '../../shared/interfaces';
import { ProductData } from '../../mock/interfaces/product-data';
import { createNewProductData } from '../../mock/functions/mock-data';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { CreateComponentDialogueComponent } from './create-component-dialogue/create-component-dialogue.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  columns: TableColumn[] = [];
  buttons: TableBtn[] = [];
  data: ProductData[] = [];
  totalPrice: number = 0;
  footer: string = '';

  constructor(
    private translate: TranslateService,
    public dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.data = Array.from({ length: 100 }, (_, k) =>
      createNewProductData(k + 1)
    );
    this.initColumns();
    this.parseRoute(this.location.path());
    this.initActionButtons();

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
    this.footer = this.FooterText;
  }

  get FooterText() {
    return this.translate.instant('totalPriceLabel', {
      totalPrice: this.totalPrice,
    });
  }

  buttonClick(result: any) {
    console.log(result[0]);
    if (result[0] == 'delete') {
      this.data = this.data.filter((x) => x.id != result[1]);
    } else {
      let data = this.data.find((x) => x.id == result[1]);
      this.openCreateProductDialogue(data, 'edit');
    }
  }

  parseRoute(route: any) {
    let editId: any = null;
    route.split('/').forEach((part: any) => {
      if (part[0] == ':') {
        editId = part.substring(1);
      }
    });
    if (editId != null) {
      let product = this.data.find((x) => x.id == editId);
      if (product) {
        this.openCreateProductDialogue(product, 'edit');
      }
    }
  }

  initColumns() {
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
        cell: (element: ProductData) =>
          `${element.description ? element.description : ''}`,
      },
    ];
  }

  openCreateProductDialogue(productData: any = {}, mode = 'create') {
    if (mode == 'edit') {
      this.location.go(`/products/:${productData.id}`);
    } else {
      this.location.go(`/products/create`);
    }
    const dialogRef = this.dialog.open(CreateComponentDialogueComponent, {
      width: '500px',
      data: productData,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: ProductData) => {
      this.location.go(`/products`);
      if (mode == 'create') {
        result.id = crypto.randomUUID();
        this.data = [result, ...this.data];
      } else {
      }
    });
  }

  initActionButtons(){
    this.buttons = [
      {
        styleClass: 'btn btn-success px-2',
        icon: 'delete',
        payload: (element: ProductData) => `${element.id}`,
        action: 'delete',
      },
      {
        styleClass: 'btn btn-primary px-2',
        icon: 'build',
        payload: (element: ProductData) => `${element.id}`,
        action: 'edit',
      },
    ];
  }
}
