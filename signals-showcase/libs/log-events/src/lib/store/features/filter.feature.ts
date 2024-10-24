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
    withComputed((state) => ({
      filterTableValue: computed<FilterValue[]>(() =>
        Object.entries(state.filter()).map(([key, value]) => ({
          name: key as ComponentType,
          value: value,
        }))
      ),
    })),
    withMethods((store) => ({
      updateFilter(filterValue: FilterValue) {
        patchState(store, (state) => {
          const filter = state.filter;
          filter[filterValue.name] = filterValue.value;

          return { filter: { ...filter } };
        });
      },
    }))
  );
}
