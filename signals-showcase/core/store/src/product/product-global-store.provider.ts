import { UnwrapType } from '@showcase/common-models';
import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from "@angular/core";
import { ProductGlobalStore } from './product-global.store';
import { ProductApi } from '@showcase/core-api';

export const PRODUCT_GLOBAL_STORE = new InjectionToken<UnwrapType<typeof ProductGlobalStore>>('GLOBAL_STORE.PRODUCT');

export function provideProductGlobalStore(): EnvironmentProviders {
  return makeEnvironmentProviders([
    ProductApi,
    {
      provide: PRODUCT_GLOBAL_STORE,
      useFactory: () => new ProductGlobalStore()
    }
  ])
}
