import {
  patchState,
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Product, PRODUCT_GLOBAL_STORE } from '@showcase/core-store';
import { inject } from '@angular/core';

const defaultProductsState = {
  items: new Array<Product>()
};

interface ProductsState {
  items: Product[];
}

export function withProductsFeature() {
  return signalStoreFeature(
    withState(defaultProductsState),
    withMethods((store) => ({
      updateItems(items: Product[]) {
        patchState(store, { items });
      },
    })),
    withMethods((store, productGlobalStore = inject(PRODUCT_GLOBAL_STORE)) => ({
      _loadItems: rxMethod<void>(
        pipe(
          switchMap(() => {
            return productGlobalStore.getProducts().pipe(
              tap((data) => {
                store.updateItems(data);
              })
            );
          })
        )
      ),
    })),
    withHooks((store) => ({
      onInit() {
        store._loadItems();
      },
    }))
  );
}
