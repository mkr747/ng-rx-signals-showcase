import { UnwrapType } from '@showcase/common-models';
import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from "@angular/core";
import { CartGlobalStore } from './cart-global.store';

export const CART_GLOBAL_STORE = new InjectionToken<UnwrapType<typeof CartGlobalStore>>('GLOBAL_STORE.CART');

export function provideCartGlobalStore(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: CART_GLOBAL_STORE,
      useFactory: () => new CartGlobalStore()
    }
  ])
}
