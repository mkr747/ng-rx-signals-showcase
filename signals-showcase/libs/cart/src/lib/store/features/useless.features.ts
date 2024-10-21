import { signalStoreFeature, type, withMethods } from "@ngrx/signals";
import { EntityMap } from "@ngrx/signals/entities";
import { ProductOrder } from "../../models/cart.model";

export function withUselessFeature() {
  return signalStoreFeature(
    {
      state: type<{ _productOrdersEntityMap: EntityMap<ProductOrder> }>(),
    },
    withMethods((store) => ({

    }))
  );
}
