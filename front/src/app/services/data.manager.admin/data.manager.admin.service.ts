import {Injectable} from '@angular/core';
import {BehaviorSubject, filter, map, switchMap, withLatestFrom} from 'rxjs';
import {ProductModels} from '../../models/product/product.models';
import {HttpService} from '../../core/http/http';
import {StatAppService} from '../stat.app/stat.app.service';

@Injectable({
  providedIn: 'root'
})
export class DataManagerAdminService {

  private dataRolling = new BehaviorSubject<ProductModels[]>([]);
  private initialized = false;

  constructor(
    private readonly http: HttpService,
    private readonly stateAppService: StatAppService) {
    this.watchDataEvolving();
    this.watchDataEvolvingRolling();
  }

  getProducts() {
    return this.dataRolling.asObservable();
  }

  setProducts(products: ProductModels[]) {
    this.dataRolling.next(products);
  }

  // Méthode qui vérifie si la liste est vide et initialise les données
  private watchDataEvolving() {
    if (this.dataRolling.getValue().length === 0) {
      this.http.getProducts(0, 50).subscribe(response => {
        this.setProducts(response.data);
        this.stateAppService.setLimitElementRolling(response.totalElement);
        this.initialized = true;
      });
    }
  }

  // Méthode qui vérifie les conditions pour recharger les données en fonction de la page courante
  private watchDataEvolvingRolling() {
    this.stateAppService.getCurrentPageAdmin().pipe(
      filter(() => this.initialized),  // Assurez-vous que les données initiales ont été chargées
      withLatestFrom(this.stateAppService.getLimitElementRolling()),
      map(([currentPage, limitElementRolling]) => {
        let totalItemsToLoad = 50 * currentPage;
        if (totalItemsToLoad > limitElementRolling) {
          totalItemsToLoad = limitElementRolling;
        }
        return totalItemsToLoad;
      }),
      switchMap(totalItemsToLoad => this.http.getProducts(0, totalItemsToLoad))
    ).subscribe(response => {
      this.setProducts(response.data);
    });
  }
}
