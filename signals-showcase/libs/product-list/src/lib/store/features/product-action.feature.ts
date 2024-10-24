import {
  signalStoreFeature,
  type,
  watchState,
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
import { CART_GLOBAL_STORE, LOG_GLOBAL_STORE, Product, PRODUCT_GLOBAL_STORE } from '@showcase/core-store';
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
          const item = store.items().find(x => x.id === payload.id);
          if (item == null) {
            return;
          }

          cartGlobalStore.addProductOrder({
            id: payload.id,
            name: item.name,
            amount: payload.amount,
            completed: false,
            price: item.price
          });
        }

        function handleCheckDetails(payload: string) {
          console.log(payload);
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
    withHooks((store, logGlobalStore = inject(LOG_GLOBAL_STORE),
    productGlobalStore = inject(PRODUCT_GLOBAL_STORE)) => ({
      onInit() {
        store
          ._listenToProductionActionHandler()
          .pipe(takeUntilDestroyed())
          .subscribe();

        watchState(store, (state) => {
          logGlobalStore.log('ProductList', `items: ${JSON.stringify(state.items)}`);
        });

        watchState(productGlobalStore, (state) => {
          logGlobalStore.log('ProductList', `detailsId: ${JSON.stringify(state.data.productDetailId)}`);
        })
      },
    }))
  );
}
