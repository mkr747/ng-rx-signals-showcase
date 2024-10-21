import { inject } from '@angular/core';
import { signalStore, withMethods } from '@ngrx/signals';
import { ProductApi} from '@showcase/core-api';

export const ProductGlobalStore = signalStore(
  withMethods((store, productApi = inject(ProductApi)) => ({
    getProducts() {
      return productApi.getAll();
     },
     getById(id: string) {
      return productApi.get(id);
     }
  }))
)
