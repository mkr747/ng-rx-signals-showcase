import {
  deepComputed,
  type,
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
} from '@ngrx/signals';
import {
  addEntity,
  entityConfig,
  removeEntity,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { ProductOrder } from '../../models/cart.model';
import { computed } from '@angular/core';

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
    withMethods((store) => ({
      addProductOrder(productOrder: ProductOrder) {
        patchState(
          store,
          addEntity(productOrder, { collection: '_productOrders' })
        );
      },
      removeProductOrder(id: string) {
        patchState(store, removeEntity(id, { collection: '_productOrders' }));
      },
      completeProductOrder(id: string) {
        patchState(
          store,
          updateEntity(
            {
              id,
              changes: (productOrder) => {
                if (productOrder.amount <= 0) {
                  return { completed: false };
                }

                return { completed: true };
              },
            },
            { collection: '_productOrders' }
          )
        );
      },
    })),
    withComputed((store) => ({
      _orderedProduct: computed<ProductOrder[]>(() =>
        store.productOrders().filter((x) => x.completed)
      ),
    })),
    withComputed((store) => ({
      summary: deepComputed(() => ({
        orderedProducts: store._orderedProduct(),
        price: store
          ._orderedProduct()
          .reduce((sum, current) => sum + current.price * current.amount, 0),
        details: deepComputed(() => ({
          nameOfCompany: 'Wizard inc.',
          address: 'Hogwart',
        })),
      })),
    }))
  );
}
