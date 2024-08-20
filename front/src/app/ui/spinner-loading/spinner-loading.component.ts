import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-spinner-loading',
  template: `
    <div class="loading-container">
      <div class="square" *ngFor="let square of squares"></div>
    </div>
  `,
  styleUrls: ['./spinner-loading.component.scss']
})
export class SpinnerLoadingComponent implements OnInit {

  squares = Array(10).fill(0);

  constructor() { }

  ngOnInit(): void { }

}
