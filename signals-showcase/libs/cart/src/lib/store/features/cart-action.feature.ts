import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartAction, CartActionType, ProductOrder } from './../../models/cart.model';
import {
  signalStoreFeature,
  type,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { concatMap, EMPTY, of, Subject } from 'rxjs';

const CartActionRequirements = {
  methods: type<{
    addProductOrder(productOrder: ProductOrder): void;
    removeProductOrder(id: string): void;
    completeProductOrder(id: string): void;
  }>(),
};

export function withCartActionFeature() {
  return signalStoreFeature(
    CartActionRequirements,
    withState<{
      isLoading: boolean;
    }>({
      isLoading: false,
    }),
    withMethods((store, handleCartAction$ = new Subject<CartAction>()) => {
      function handleAction(action: CartAction) {
        switch (action.type) {
          case CartActionType.RemoveFromCart:

            return of(void 0);
          case CartActionType.SubmitCart:
            return of(void 0);
          default:
            return of(void 0);
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
