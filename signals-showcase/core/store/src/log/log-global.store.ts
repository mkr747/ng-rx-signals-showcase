import {
  patchState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Log, ComponentType } from './log.model';

export const LogGlobalStore = signalStore(
  withState<{
    logs: Log[];
  }>({
    logs: []
  }),
  withMethods((store) => ({
    log(componentName: ComponentType, stateChange: string) {
      const log: Log = {
        id: store.logs().length,
        domain: componentName,
        log: stateChange,
      };
      patchState(store, (state) => ({ logs: [...state.logs, log] }));
    },
  }))
);
