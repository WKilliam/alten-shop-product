import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ProductModels} from '../../models/product/product.models';

@Component({
  selector: 'app-ui-modal-product',
  templateUrl: './modal.product.component.html',
  styleUrls: ['./modal.product.component.scss']
})
export class ModalProductComponent implements OnInit {

  @Input() product: ProductModels;
  @Input() display = false;
  @Output() save: EventEmitter<ProductModels> = new EventEmitter<ProductModels>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [this.product?.id],
      name: [this.product?.name, Validators.required],
      description: [this.product?.description],
      price: [this.product?.price, [Validators.required, Validators.min(0)]],
      quantity: [this.product?.quantity, [Validators.required, Validators.min(0)]],
      inventoryStatus: [this.product?.inventoryStatus, Validators.required],
      category: [this.product?.category, Validators.required],
      image: [this.product?.image]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.save.emit(this.productForm.value);
      this.display = false;
    }
  }

  onCancel(): void {
    this.close.emit();
    this.display = false;
  }

}
