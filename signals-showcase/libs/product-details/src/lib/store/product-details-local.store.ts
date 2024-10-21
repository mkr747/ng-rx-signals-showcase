import { signalStore, withState } from "@ngrx/signals";

export const CartLocalStore = signalStore(
  withState({})
)
