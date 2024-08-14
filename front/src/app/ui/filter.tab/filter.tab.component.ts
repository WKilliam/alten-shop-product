import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {GENERAL} from '../../constant/GENERAL';
import {DataManagerService} from '../../services/data.manager/data.manager.service';


@Component({
  selector: 'app-ui-filter-tab',
  templateUrl: './filter.tab.component.html',
  styleUrls: ['./filter.tab.component.scss']
})
export class FilterTabComponent implements OnInit {

  form: FormGroup = new FormGroup({
    search: new FormControl(''),
    sort: new FormControl(''),
  });
  isGridView = true;
  protected options = new GENERAL().getTextArraySortBy();

  constructor(private readonly dataManager: DataManagerService) {}

  ngOnInit(): void {

    this.form.get('sort')?.valueChanges.subscribe((value) => {
      console.log('Sort changed:', value);
      this.dataManager.setUrlSearch(value);
    });
    this.form.get('search')?.valueChanges.subscribe((value) => {
      console.log('Search changed:', value);
      this.dataManager.setSearch(value);
    });
  }

  toggleView() {
    this.dataManager.setViewMode(!this.isGridView);
    this.dataManager.getViewMode().subscribe((value) => {
      this.isGridView = value;
    });
  }

}
