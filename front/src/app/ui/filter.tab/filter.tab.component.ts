import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FilterService} from '../../services/filter/filter.service';
import {GENERAL} from '../../constant/GENERAL';

@Component({
  selector: 'app-ui-filter-tab',
  templateUrl: './filter.tab.component.html',
  styleUrls: ['./filter.tab.component.scss']
})
export class FilterTabComponent implements OnInit {

  form: FormGroup = new FormGroup({
    search: new FormControl(''),
  });
  isGridView = true;
  protected options = new GENERAL().getTextArraySortBy();

  constructor(private readonly filterService: FilterService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Submit');
  }

  toggleView() {
    this.isGridView = !this.isGridView;
  }
}
