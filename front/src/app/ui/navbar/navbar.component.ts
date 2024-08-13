import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ui-navbar',
  template: `
    <div class="navbar">
      <div class="actions">
        <!-- Switch mode -->
        <app-theme-toggle-button></app-theme-toggle-button>

        <!-- Shopping Cart -->
        <div class="shopping-cart" title="Shopping Cart">
          <i class="pi pi-shopping-cart"></i>
          <span *ngIf="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
        </div>

        <!-- Admin -->
        <div class="user-button">
          <button pButton icon="pi pi-user" type="button" class="p-button-rounded p-button-outlined"></button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() isAuthenticated = true;
  @Input() cartItemCount = 0;

  constructor() {}


}
