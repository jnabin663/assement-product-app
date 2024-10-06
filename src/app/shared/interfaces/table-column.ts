export interface TableColumn {
    columnDef: string;
    header: string;
    sortProperty: string,
    cell: (any: any) => string;
  }