import {
  signalStoreFeature,
  type,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import {
  Order,
  ProductAction,
  ProductActionType,
} from '../../models/product.models';
import { concatMap, EMPTY, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CART_GLOBAL_STORE, Product, PRODUCT_GLOBAL_STORE } from '@showcase/core-store';
import { inject } from '@angular/core';

const ProductActionRequirements = {
  state: type<{
    items: Product[];
  }>(),
};

export function withProductActionFeature() {
  return signalStoreFeature(
    ProductActionRequirements,
    withMethods(
      (
        store,
        cartGlobalStore = inject(CART_GLOBAL_STORE),
        productGlobalStore = inject(PRODUCT_GLOBAL_STORE)
      ) => {
        // another way of handling withMethods
        function handleAddToCart(payload: Order) {
          const price = store.items().find(x => x.id === payload.id)?.price;
          if (price == null) {
            return;
          }

          cartGlobalStore.addProductOrder({
            id: payload.id,
            amount: payload.amount,
            completed: false,
            price: price
          });
        }

        function handleCheckDetails(payload: string) {
          productGlobalStore.setProductDetailId(payload);
        }

        return {
          _handleAction(action: ProductAction) {
            switch (action.type) {
              case ProductActionType.AddToCart:
                return handleAddToCart(action.payload);
              case ProductActionType.CheckDetails:
                return handleCheckDetails(action.payload);
            }
          },
        };
      }
    ),
    withMethods(
      (store, handleProductAction$ = new Subject<ProductAction>()) => ({
        handleProductAction(action: ProductAction) {
          handleProductAction$.next(action);
        },
        _listenToProductionActionHandler() {
          return handleProductAction$.pipe(
            concatMap((action) => {
              store._handleAction(action)

              return EMPTY;
            })
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
