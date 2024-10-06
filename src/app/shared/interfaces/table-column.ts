export interface TableColumn {
    columnDef: string;
    header: string;
    cell: (any: any) => string;
  }