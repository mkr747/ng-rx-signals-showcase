import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  deepComputed,
  type,
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withHooks,
  watchState,
} from '@ngrx/signals';
import {
  addEntity,
  entityConfig,
  removeEntity,
  updateAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { computed, inject } from '@angular/core';
import { CART_GLOBAL_STORE, LOG_GLOBAL_STORE, ProductOrder } from '@showcase/core-store';
import { concatMap, of, pipe } from 'rxjs';

const productOrderEntitiesConfig = entityConfig({
  entity: type<ProductOrder>(),
  collection: '_productOrders',
  selectId: (productOrder) => productOrder.id,
});

export function withCartFeature() {
  return signalStoreFeature(
    withEntities(productOrderEntitiesConfig),
    // Exposing _productOrderEntities
    withComputed(({ _productOrdersEntities }) => ({
      productOrders: _productOrdersEntities,
    })),
    withMethods((store, cartGlobalStore = inject(CART_GLOBAL_STORE)) => ({
      addProductOrder(productOrder: ProductOrder) {
        patchState(
          store,
          addEntity(productOrder, { collection: '_productOrders' })
        );
      },
      removeProductOrder(id: string) {
        patchState(store, removeEntity(id, { collection: '_productOrders' }));
        cartGlobalStore.removeProduct(id);
      },
      updateAmountProductOrder(id: string, amount: number) {
        patchState(store,
          updateEntity({ id, changes: ({ amount: amount }) }, { collection: '_productOrders' })
        )
      },
      completeProductsOrder() {
        patchState(
          store,
          updateAllEntities(({ completed: true}),
            { collection: '_productOrders' }
          )
        );
      },
    })),
    withMethods((store) => ({
      addProductOrdersRx: rxMethod<ProductOrder[]>(pipe(
        concatMap((products) => {
          for(const product of products) {
            if (store._productOrdersEntities().findIndex(x => x.id === product.id) !== -1) {
              store.updateAmountProductOrder(product.id, product.amount);
            }

            store.addProductOrder(product);
          }

          return of(void 0);
        })
      ))
    })),
    withComputed((state) => ({
      _orderedProduct: computed<ProductOrder[]>(() =>
        state.productOrders().filter((x) => x.completed)
      ),
    })),
    withComputed((state) => ({
      summary: deepComputed(() => ({
        orderedProducts: state._orderedProduct(),
        price: state
          ._orderedProduct()
          .reduce((sum, current) => sum + current.price * current.amount, 0),
        details: deepComputed(() => ({
          nameOfCompany: 'Wizard inc.',
          address: 'Hogwart',
        })),
      })),
    })),
    withHooks((store, cartGlobalStore = inject(CART_GLOBAL_STORE), logGlobalStore = inject(LOG_GLOBAL_STORE)) => ({
      onInit() {
        store.addProductOrdersRx(cartGlobalStore.data.productOrders);

        watchState(store, (state) => {
          logGlobalStore.log('Cart', `Entities: ${JSON.stringify(state._productOrdersEntityMap)}`);
        });

        watchState(cartGlobalStore, (state) => {
          logGlobalStore.log('Cart', `productOrders: ${JSON.stringify(state.data.productOrders)}`);
        })
      }
    }))
  );
}
