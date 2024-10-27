import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  template: `
    <h1> Signal store counter </h1>
    <p>Count : {{ '' }} </p>
    <p>Double Count: {{ '' }} </p>
    <p>Updated with: {{ '' }}</p>

    <button (click)="''">Increment</button>
    <button (click)="''">Decrement</button>
     `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

}
