import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GENERAL } from '../../constant/GENERAL';
import { StatAppService } from '../../services/stat.app/stat.app.service';

@Component({
  selector: 'app-ui-filter-tab',
  templateUrl: './filter.tab.component.html',
  styleUrls: ['./filter.tab.component.scss']
})
export class FilterTabComponent implements OnInit {

  form: FormGroup = new FormGroup({
    search: new FormControl({ value: '', disabled: true }),
    sort: new FormControl(''),
  });
  isGridView = true;
  protected options = new GENERAL().getTextArraySortBy();

  constructor(private readonly statAppService: StatAppService) {}

  ngOnInit(): void {
    this.form.get('sort')?.valueChanges.subscribe((value) => {
      this.resetSearchField();

      if (value !== '') {
        this.statAppService.setUrlSuffixForSort(value);
        this.form.get('search')?.enable();
      } else {
        this.resetToInitialState();
      }
    });

    this.form.get('search')?.valueChanges.subscribe((value) => {
      this.statAppService.setSearch(value);
    });
  }

  toggleView() {
    this.statAppService.setViewMode(!this.isGridView);
    this.statAppService.getViewMode().subscribe((value) => {
      this.isGridView = value;
    });
  }

  private resetSearchField(): void {
    this.form.get('search')?.setValue('');
    this.statAppService.setSearch('');
  }

  private resetToInitialState(): void {
    this.resetSearchField();
    this.form.get('search')?.disable();
    this.statAppService.resetUrlSuffixForSort();
  }
}
