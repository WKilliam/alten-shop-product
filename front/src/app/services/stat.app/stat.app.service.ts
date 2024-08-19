import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {GENERAL} from '../../constant/GENERAL';

@Injectable({
  providedIn: 'root'
})
export class StatAppService {

  private GENERAL = new GENERAL();

  private urlSearch = new BehaviorSubject<string>(this.GENERAL.getTabContentDefault().urlSearch);
  private search = new BehaviorSubject<string>(this.GENERAL.getTabContentDefault().search);
  private totalPages = new BehaviorSubject<number>(this.GENERAL.getTabContentDefault().totalPages);
  private currentPage = new BehaviorSubject<number>(this.GENERAL.getTabContentDefault().currentPage);
  private elementPrintSize = new BehaviorSubject<number>(this.GENERAL.getTabContentDefault().elementPrintSize);
  private elementPrintSizeMax = new BehaviorSubject<number>(this.GENERAL.getTabContentDefault().elementPrintSizeMax);
  private viewMode = new BehaviorSubject<boolean>(this.GENERAL.getTabContentDefault().viewMode);

  setUrlSuffixForSort(value: string): void {
    this.urlSearch.next(value);
  }

  getUrlSuffixForSort() {
    return this.urlSearch.asObservable();
  }

  setSearch(value: string): void {
    this.search.next(value);
  }

  getSearch() {
    return this.search.asObservable();
  }

  setCurrentPage(value: number): void {
    this.currentPage.next(value);
  }

  getCurrentPage() {
    return this.currentPage.asObservable();
  }

  setTotalPages(value: number): void {
    this.totalPages.next(value);
  }

  getTotalPages() {
    return this.totalPages.asObservable();
  }

  setElementPrintSize(value: number): void {
    this.elementPrintSize.next(value);
  }

  getElementPrintSize() {
    return this.elementPrintSize.asObservable();
  }

  setElementPrintSizeMax(value: number): void {
    this.elementPrintSizeMax.next(value);
  }

  getElementPrintSizeMax() {
    return this.elementPrintSizeMax.asObservable();
  }

  setViewMode(value: boolean): void {
    this.viewMode.next(value);
  }

  getViewMode() {
    return this.viewMode.asObservable();
  }

}
