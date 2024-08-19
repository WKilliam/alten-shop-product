export interface StatAppModel {
  urlSearch: string;
  search: string;
  totalPages: number;
  currentPage: number;
  elementPrintSize: number;
  viewMode: boolean;
}

export interface CheckStatAppModel {
  urlSearch: boolean;
  search: boolean;
  totalPages: boolean;
  currentPage: boolean;
  elementPrintSize: boolean;
  viewMode: boolean;
}
