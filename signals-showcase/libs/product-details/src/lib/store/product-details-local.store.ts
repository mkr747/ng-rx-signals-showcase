import { signalStore, withState } from "@ngrx/signals";

export const ProductDetailsLocalStore = signalStore(
  withState({
    isLoading: false
  })
)
