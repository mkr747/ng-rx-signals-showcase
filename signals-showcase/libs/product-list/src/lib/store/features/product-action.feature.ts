import {
  signalStoreFeature,
  type,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import {
  ProductAction,
  ProductItem,
  ProductActionType,
} from '../../models/product.models';
import { concatMap, EMPTY, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const ProductActionRequirements = {
  state: type<{
    items: ProductItem[];
  }>()
};

export function withProductActionFeature() {
  return signalStoreFeature(
    ProductActionRequirements,
    withMethods(() => ({
      _handleAction(action: ProductAction) {
        switch (action.type) {
          case ProductActionType.AddToCart:
            return EMPTY;
          case ProductActionType.CheckDetails:
            return EMPTY;
        }
      },
    })),
    withMethods(
      (store, handleProductAction$ = new Subject<ProductAction>()) => ({
        handleProductAction(action: ProductAction) {
          handleProductAction$.next(action);
        },
        _listenToProductionActionHandler() {
          return handleProductAction$.pipe(
            concatMap((action) => store._handleAction(action))
          );
        },
      })
    ),
    withHooks((store) => ({
      onInit() {
        store
          ._listenToProductionActionHandler()
          .pipe(takeUntilDestroyed())
          .subscribe();
      },
    }))
  );
}
