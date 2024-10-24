import { computed, inject } from '@angular/core';
import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { ComponentType, LOG_GLOBAL_STORE } from '@showcase/core-store';
import { TableModel } from '../../models/log.model';

export function withTableFeature() {
  return signalStoreFeature(
    {
      state: type<{
        filter: Record<ComponentType, boolean>;
      }>(),
    },
    withComputed((state, logGlobalStore = inject(LOG_GLOBAL_STORE)) => ({
      filteredLogs: computed<TableModel[]>(() =>
        logGlobalStore.logs().filter((log) => state.filter()[log.domain]).map(log => ({
          header: log.domain,
          content: log.log
        }))
      ),
    }))
  );
}
