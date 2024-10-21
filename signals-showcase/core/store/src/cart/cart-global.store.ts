import { signalStore, withState } from '@ngrx/signals';
export const CartGlobalStore = signalStore(
  withState({
    isLoading: false
  })
)
