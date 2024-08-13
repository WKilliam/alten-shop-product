import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainContentService {

  public currentPageName$: BehaviorSubject<string> = new BehaviorSubject('Home');
  private _isLoading = new BehaviorSubject<boolean>(false);

  constructor() {}

  public setCurrentPageName(pageName: string): void {
    this.currentPageName$.next(pageName);
  }

  public getCurrentPageName(): string {
    return this.currentPageName$.value;
  }

  public setLoading(isLoading: boolean): void {
    this._isLoading.next(isLoading);
  }

  public getLoading(): BehaviorSubject<boolean> {
    return this._isLoading;
  }
}
