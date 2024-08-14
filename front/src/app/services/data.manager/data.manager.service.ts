import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  private urlSearch = new BehaviorSubject<string>('');
  private search = new BehaviorSubject<string>('');
  private totalPages = new BehaviorSubject<number>(0);
  private currentPage = new BehaviorSubject<number>(1);
  private viewMode = new BehaviorSubject<boolean>(true);


  constructor() { }

  setUrlSearch(value: string): void {
    this.urlSearch.next(value);
  }

  getUrlSearch() {
    return this.urlSearch.asObservable();
  }

  setTotalPages(value: number): void {
    this.totalPages.next(value);
  }

  getTotalPages() {
    return this.totalPages.asObservable();
  }

  setCurrentPage(value: number): void {
    this.currentPage.next(value);
  }

  getCurrentPage() {
    return this.currentPage.asObservable();
  }

  setViewMode(value: boolean): void {
    this.viewMode.next(value);
  }

  getViewMode() {
    return this.viewMode.asObservable();
  }

  toggleViewMode() {
    this.viewMode.next(!this.viewMode.getValue());
  }

  setSearch(value: string): void {
    this.search.next(value);
  }

  getSearch() {
    return this.search.asObservable();
  }

  reset() {
    this.urlSearch.next('');
    this.totalPages.next(0);
    this.currentPage.next(1);
    this.viewMode.next(true);
  }

}
