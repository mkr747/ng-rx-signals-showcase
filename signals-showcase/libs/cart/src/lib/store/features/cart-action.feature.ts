import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartAction, CartActionType } from './../../models/cart.model';
import {
  signalStoreFeature,
  type,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { concatMap, EMPTY, of, Subject } from 'rxjs';

const CartActionRequirements = {
  methods: type<{
    removeProductOrder(id: string): void;
    completeProductsOrder(): void;
    updateAmountProductOrder(id: string, amount: number): void;
  }>(),
};

export function withCartActionFeature() {
  return signalStoreFeature(
    CartActionRequirements,
    withMethods((store, handleCartAction$ = new Subject<CartAction>()) => {
      function handleAction(action: CartAction) {
        switch (action.type) {
          case CartActionType.RemoveFromCart:
            store.removeProductOrder(action.payload);
            return of(void 0);
          case CartActionType.SubmitCart:
            store.completeProductsOrder();
            return of(void 0);
          case CartActionType.ChangeAmount:
            store.updateAmountProductOrder(action.payload.id, action.payload.updatedAmount);

            return of(void 0);
          default:
            return EMPTY;
        }
      }

      return {
        handleCartAction(action: CartAction) {
          handleCartAction$.next(action);
        },
        _listenToCartActionHandler() {
          return handleCartAction$.pipe(
            concatMap((action) => {
              handleAction(action);

              return EMPTY;
            })
          );
        },
      };
    }),
    withHooks((store) => ({
      onInit() {
        store
          ._listenToCartActionHandler()
          .pipe(takeUntilDestroyed())
          .subscribe();
      },
    }))
  );
}
