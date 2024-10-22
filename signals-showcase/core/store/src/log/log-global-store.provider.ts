import { UnwrapType } from '@showcase/common-models';
import { LogGlobalStore } from './log-global.store';
import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from "@angular/core";

export const LOG_GLOBAL_STORE = new InjectionToken<UnwrapType<typeof LogGlobalStore>>('GLOBAL_STORE.LOG');

export function provideLogGlobalStore(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: LOG_GLOBAL_STORE,
      useFactory: () => new LogGlobalStore()
    }
  ])
}
