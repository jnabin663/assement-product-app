import {Component, Input, Output, EventEmitter, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TableBtn, TableColumn } from '../interfaces';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.css']
})
export class CommonTableComponent{

  @Input() canCreate: boolean = true;
  @Input() createButtonName: string = 'Create';
  @Input() columns: TableColumn[] = [];
  @Input() buttons: TableBtn[] = [];
  @Input() data: any[] = [];
  @Input() filter: boolean = false;
  @Input() filterPlaceholder: string = 'Filter';
  @Input() footer: string | null = null;
  @Input() pagination: number[] = [];
  @Input() pageSize?: number;
  @Input() tableMinWidth: number = 500;
  @Output() filteredData = new EventEmitter<any[]>();
  @Output() buttonClick = new EventEmitter<string[]>();
  @Output() createClick = new EventEmitter<any>();

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns?: string[];

  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort?: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data){
      if(changes['data']){
        this.dataSource =  new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort!;
        this.dataSource.paginator = this.paginator!;
        this.displayedColumns = [...this.columns.map(c => c.columnDef)];
        if (this.buttons.length > 0 ) this.displayedColumns = [...this.displayedColumns, 'actions'];
      }
    }
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredData.emit(this.dataSource.filteredData);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    
    this.dataSource.sort = this.sort!;
  }

}
