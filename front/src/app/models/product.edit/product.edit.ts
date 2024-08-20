import {ProductModels} from '../product/product.models';

export interface ProductEditModel extends ProductModels {
  selectedProduct: boolean;
  onEdit: () => void;
  onDelete: () => void;
}
