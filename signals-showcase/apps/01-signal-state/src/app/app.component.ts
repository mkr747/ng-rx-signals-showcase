import { ChangeDetectionStrategy, Component,  } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  providers: [],
  selector: 'app-root',
  template: `
    <h1> Signal state counter </h1>
    <p>Count : {{ '' }} </p>
    <p>Double Count: {{ '' }} </p>

    <button (click)="''">Increment</button>
    <button (click)="''">Decrement</button>
     `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
