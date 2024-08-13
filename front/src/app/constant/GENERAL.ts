import {NgModule} from '@angular/core';

@NgModule({})
export class GENERAL {
  private textMap = new Map<string, string>([
    ['APP_TITLE', 'My Application Title'],
    ['WELCOME_MESSAGE', 'Welcome to the application!'],
    ['ERROR_MESSAGE', 'An error has occurred. Please try again later.'],
    ['SUCCESS_MESSAGE', 'Operation completed successfully!'],

    // Sidenav
    ['SIDENAV_TITLE', 'Alten Shop']
  ]);

  private objectMap = new Map<string, any>([
    // Sidenav
    ['SIDENAV_ITEMS', [
      {
        label: {
          en: 'Products',
          fr: 'Produits'
        },
        link: '/products',
        icon: 'shopping-cart'
      },
      {
        label: {
          en: 'Product Admin Panel',
          fr: 'Panneau d\'administration des produits'
        },
        link: '/admin/products',
        icon: 'cog'
      }
    ]]
  ]);

  getText(key: string): string {
    return this.textMap.get(key);
  }

  getObject(key: string): any {
    return this.objectMap.get(key);
  }
}
