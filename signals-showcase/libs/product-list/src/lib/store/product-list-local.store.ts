import { signalStore } from "@ngrx/signals";
import { withProductsFeature } from "./features/product.feature";
import { withProductActionFeature } from "./features/product-action.feature";

export const ProductListLocalStore = signalStore(
  withProductsFeature(),
  withProductActionFeature()
)
