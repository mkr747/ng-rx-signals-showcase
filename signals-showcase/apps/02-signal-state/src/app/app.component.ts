import { ChangeDetectionStrategy, Component, computed,  } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';

@Component({
  standalone: true,
  imports: [],
  providers: [],
  selector: 'app-root',
  template: `
    <h1> Signal store counter </h1>
    <p>Count : {{ counterState.counter.value() }} </p>
    <p>Double Count: {{ doubleCount() }} </p>

    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
     `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly counterState = signalState({
    counter: {
      value: 0,
      isLoading: false,
    },
  });

  increment() {
    patchState(this.counterState, (state) => ({
      counter: { ...state.counter, value: state.counter.value + 1 },
    }));
  }

  decrement() {
    patchState(this.counterState, (state) => ({
      counter: { ...state.counter, value: state.counter.value - 1 },
    }));
  }

  updateLoading(isLoading: boolean) {
    patchState(this.counterState, (state) => ({
      counter: { ...state.counter, isLoading },
    }));
  }

  readonly isNegative = computed<boolean>(
    () => this.counterState.counter.value() < 0
  );

  readonly doubleCount = computed<number>(
    () => this.counterState.counter.value() * 2
  );
}
