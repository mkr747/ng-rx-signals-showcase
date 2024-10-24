import { CartGlobalStore } from './../../../../../../core/store/src/cart/cart-global.store';
import {
  deepComputed,
  type,
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withHooks,
} from '@ngrx/signals';
import {
  addEntity,
  entityConfig,
  removeEntity,
  updateAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { computed, effect, inject, untracked } from '@angular/core';
import { CART_GLOBAL_STORE, ProductOrder } from '@showcase/core-store';
import { toObservable } from '@angular/core/rxjs-interop';

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
    withHooks((store, cartGlobalStore = inject(CART_GLOBAL_STORE)) => ({
      onInit() {
        effect(() => {
          const products = cartGlobalStore.data.productOrders();
          untracked(() => {
            for(const product of products) {
              store.addProductOrder(product);
            }
          })
        })
      }
    }))
  );
}
