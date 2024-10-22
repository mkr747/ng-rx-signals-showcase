import { computed } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ComponentType } from '@showcase/core-store';
import { FilterValue } from '../../models/log.model';

export function withFilterFeature() {
  return signalStoreFeature(
    withState<{ filter: Record<ComponentType, boolean> }>({
      filter: {
        Cart: true,
        Product: true,
        ProductList: true,
      },
    }),
    withComputed((store) => ({
      filterTableValue: computed<FilterValue[]>(() =>
        Object.entries(store.filter()).map(([key, value]) => ({
          name: key,
          value: value,
        }))
      ),
    })),
    withMethods((store) => ({
      updateFilter(type: ComponentType, value: boolean) {
        patchState(store, (state) => ({
          filter: { ...state.filter, type: value },
        }));
      },
    }))
  );
}
