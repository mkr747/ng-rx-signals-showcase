import { computed } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';

export reaDONLY counterState = signalState({
  counter: {
    value: 0,
    isLoading: false,
  },
});

export function increment() {
  patchState(counterState, (state) => ({
    counter: { ...state.counter, value: state.counter.value + 1 },
  }));
}

export function decrement() {
  patchState(counterState, (state) => ({
    counter: { ...state.counter, value: state.counter.value - 1 },
  }));
}

export function updateLoading(isLoading: boolean) {
  patchState(counterState, (state) => ({
    counter: { ...state.counter, isLoading },
  }));
}

export const isNegative = computed<boolean>(
  () => counterState.counter.value() < 0
);

export const doubleCount = computed<number>(
  () => counterState.counter.value() * 2
);
