import { PRODUCT_GLOBAL_STORE, ProductDetails } from '@showcase/core-store';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { effect, inject, untracked } from '@angular/core';
import { filter, finalize, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

export const ProductDetailsLocalStore = signalStore(
  withState<{ details: ProductDetails | null; isLoading: boolean }>({
    details: null,
    isLoading: false,
  }),
  withMethods((store, productGlobalStore = inject(PRODUCT_GLOBAL_STORE)) => ({
    _loadDetails: rxMethod<string | null>(
      pipe(
        filter(x => x !== null),
        switchMap((id) => {
          patchState(store, { isLoading: false });

          return productGlobalStore.getById(id).pipe(
            tap((details) => {
              patchState(store, ({ details: details as ProductDetails }));
            }));
        }),
        finalize(() => patchState(store, { isLoading: false }))
      )
    ),
  })),
  withHooks((store, productGlobalStore = inject(PRODUCT_GLOBAL_STORE)) => ({
    onInit() {
      store._loadDetails(productGlobalStore.data.productDetailId);
    }
  }))
);
