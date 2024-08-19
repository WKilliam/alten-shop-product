import {Injectable, OnInit} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  filter,
  Observable,
  takeWhile,
  tap,
  withLatestFrom
} from 'rxjs';
import {HttpService} from '../../core/http/http';
import {StatAppService} from '../stat.app/stat.app.service';
import {ResponseModel} from '../../models/response/response';
import {ProductModels} from '../../models/product/product.models';
import {debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  private data = new BehaviorSubject<ProductModels[]>([]);
  private initiliazed = true;
  private initsearch = false;

  constructor(
    private readonly http: HttpService,
    private readonly statApp: StatAppService
  ) {
    this.watchStatAppChanges();
  }

  initCall() {
    this.fetchProductAll(0, 10, true);
  }

  private watchStatAppChanges(): void {
      this.fetchCurrentPage();
      this.fetchElementPrintSize();
      this.fetchSearch();
      this.fetchUrlSuffixForSort();
  }

  private fetchProductAll(page: number, size: number, init: boolean): void {
    this.http.getProducts(page, size).subscribe(response => {
      this.setData(response.data);
      this.setStatApp(response.currentPage, response.totalPages, size, '', '', response.totalElement, init);
    });
  }

  private fetchProductSortBy(page: number, size: number, sortBy: string, search: string): void {
    this.http.getSortBy(page, size, sortBy, search).subscribe(response => {
      this.setData(response.data);
      this.setStatApp(response.currentPage, response.totalPages, size, search, sortBy, response.totalElement, false);
    });
  }

  setStatApp(currentPage: number, page: number, size: number, search: string, sortBy: string, sizeMax: number, init: boolean): void {
    if (init) {
      this.statApp.setCurrentPage(currentPage);
      this.statApp.setTotalPages(page);
      this.statApp.setElementPrintSize(size);
      this.statApp.setElementPrintSizeMax(sizeMax);
      this.initiliazed = false;
    } else {
      this.initiliazed = true;
      if (sortBy !== '' || search !== '') {
        this.statApp.setCurrentPage(currentPage);
        this.statApp.setTotalPages(page);
        this.statApp.setElementPrintSize(size);
        this.statApp.setElementPrintSizeMax(sizeMax);
        this.statApp.setSearch(search);
        this.statApp.setUrlSuffixForSort(sortBy);
        this.initiliazed = false;
      } else {
        this.statApp.setCurrentPage(currentPage);
        this.statApp.setTotalPages(page);
        this.statApp.setElementPrintSize(size);
        this.statApp.setElementPrintSizeMax(sizeMax);
        this.initiliazed = false;
      }
    }
  }

  getData(): Observable<ProductModels[]> {
    return this.data.asObservable();
  }

  setData(value: ProductModels[]):
    void {
    this.data.next(value);
  }

  fetchCurrentPage(): void {
    this.statApp.getCurrentPage()
      .pipe(
        distinctUntilChanged(),
        withLatestFrom(
          this.statApp.getElementPrintSize().pipe(distinctUntilChanged()),
          this.statApp.getSearch().pipe(debounceTime(300), distinctUntilChanged()),
          this.statApp.getUrlSuffixForSort().pipe(distinctUntilChanged())
        ),
        filter(() => this.initiliazed === false)
      )
      .subscribe(([currentPage, elementPrintSize, search, urlSuffixForSort]) => {
        // console.log('fetchCurrentPage currentPage', currentPage);
        // console.log('fetchCurrentPage elementPrintSize', elementPrintSize);
        // console.log('fetchCurrentPage search', search);
        // console.log('fetchCurrentPage urlSuffixForSort', urlSuffixForSort);
        if (urlSuffixForSort === '' && search === '') {
          this.fetchProductAll(currentPage, elementPrintSize, false);
        }else {
          this.fetchProductSortBy(currentPage, elementPrintSize, urlSuffixForSort, search);
        }
      });
  }

  fetchElementPrintSize(): void {
    this.statApp.getElementPrintSize()
      .pipe(
        distinctUntilChanged(),
        withLatestFrom(
          this.statApp.getCurrentPage().pipe(distinctUntilChanged()),
          this.statApp.getSearch().pipe(debounceTime(300), distinctUntilChanged()),
          this.statApp.getUrlSuffixForSort().pipe(distinctUntilChanged())
        ),
        filter(() => this.initiliazed === false)
      )
      .subscribe(([elementPrintSize, currentPage, search, urlSuffixForSort]) => {
        // console.log('fetchElementPrintSize currentPage', currentPage);
        // console.log('fetchElementPrintSize elementPrintSize', elementPrintSize);
        // console.log('fetchElementPrintSize search', search);
        // console.log('fetchElementPrintSize urlSuffixForSort', urlSuffixForSort);
        if (urlSuffixForSort === '' && search === '') {
          this.fetchProductAll(currentPage, elementPrintSize, false);
        }else {
          this.fetchProductSortBy(currentPage, elementPrintSize, urlSuffixForSort, search);
        }
      });
  }

  fetchSearch(): void {
    this.statApp.getSearch()
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        withLatestFrom(
          this.statApp.getCurrentPage().pipe(distinctUntilChanged()),
          this.statApp.getElementPrintSize().pipe(distinctUntilChanged()),
          this.statApp.getUrlSuffixForSort().pipe(distinctUntilChanged())
        ),
        filter(() => this.initiliazed === false && this.initsearch === true)
      )
      .subscribe(([search, currentPage, elementPrintSize, urlSuffixForSort]) => {
        // console.log('fetchSearch currentPage', currentPage);
        // console.log('fetchSearch elementPrintSize', elementPrintSize);
        // console.log('fetchSearch search', search);
        // console.log('fetchSearch urlSuffixForSort', urlSuffixForSort);
        this.fetchProductSortBy(currentPage, elementPrintSize, urlSuffixForSort, search);
      });

  }

  fetchUrlSuffixForSort(): void {
    this.statApp.getUrlSuffixForSort()
      .pipe(
        distinctUntilChanged(),
        withLatestFrom(
          this.statApp.getCurrentPage().pipe(distinctUntilChanged()),
          this.statApp.getElementPrintSize().pipe(distinctUntilChanged()),
          this.statApp.getSearch().pipe(debounceTime(300), distinctUntilChanged())
        ),
        filter(() => this.initiliazed === false)
      )
      .subscribe(([urlSuffixForSort, currentPage, elementPrintSize, search]) => {
        this.initsearch = true;
        // console.log('fetchUrlSuffixForSort currentPage', currentPage);
        // console.log('fetchUrlSuffixForSort elementPrintSize', elementPrintSize);
        // console.log('fetchUrlSuffixForSort search', search);
        // console.log('fetchUrlSuffixForSort urlSuffixForSort', urlSuffixForSort);
        this.fetchProductSortBy(currentPage, elementPrintSize, urlSuffixForSort, search);
      });
  }
}
