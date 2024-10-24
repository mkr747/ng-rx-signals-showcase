import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { TableComponent } from './components/table/table.component';
import { LogLocalStore } from './store/log-local.store';

@Component({
  selector: 'showcase-log',
  standalone: true,
  imports: [CommonModule, FilterComponent, TableComponent],
  providers: [LogLocalStore],
  templateUrl: './log-root.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogRootComponent {
  logLocalStore = inject(LogLocalStore);
}
