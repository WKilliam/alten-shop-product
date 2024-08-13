import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterState = new BehaviorSubject<any>({
    searchQuery: '',
    selectedCategory: null,
  });

  constructor() { }
}
