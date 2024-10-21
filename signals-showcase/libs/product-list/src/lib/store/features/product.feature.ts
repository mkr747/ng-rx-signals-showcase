import {
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { EMPTY, pipe, switchMap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ProductItem } from '../../models/product.models';

const defaultProductsState = {
  items: [],
};

interface ProductsState {
  items: ProductItem[];
}

export function withProductsFeature() {
  return signalStoreFeature(
    withState<ProductsState>(defaultProductsState),
    withMethods(() => ({
      _loadItems: rxMethod<void>(
        pipe(
          switchMap((x) => {
            return EMPTY;
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
