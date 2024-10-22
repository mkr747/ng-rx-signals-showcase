import { signalStore } from "@ngrx/signals";
import { withCartFeature } from "./features/cart.feature";
import { withCartActionFeature } from "./features/cart-action.feature";

export const CartLocalStore = signalStore(
  withCartFeature(),
  withCartActionFeature()
)
