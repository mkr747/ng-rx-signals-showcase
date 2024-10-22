import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ProductApi } from '@showcase/core-api';
import { Observable } from 'rxjs';
import { Product } from './product.model';

interface ProductGlobalStoreState {
  ui: {
    isLoading: boolean;
  };
  data: {
    productDetailId: string | null;
  };
}

const defaultProductGlobalStoreState = {
  ui: {
    isLoading: false,
  },
  data: {
    productDetailId: null,
  },
};

export const ProductGlobalStore = signalStore(
  withState<ProductGlobalStoreState>(defaultProductGlobalStoreState),
  withMethods((store, productApi = inject(ProductApi)) => ({
    getProducts(): Observable<Product[]> {
      return productApi.getAll();
    },
    getById(id: string) {
      return productApi.get(id);
    },
  })),
  withMethods((store) => ({
    setProductDetailId(id: string) {
      patchState(store, (state) => ({
        data: { ...state.data, productDetailId: id },
      }));
    },
  }))
);
