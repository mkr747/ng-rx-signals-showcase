import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FilterValue } from "../../models/log.model";

@Component({
  selector: 'showcase-filter',
  standalone: true,
  imports: [ FormsModule, MatCheckboxModule ],
  templateUrl: './filter.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {
  filters = input.required<FilterValue[]>();
  updateFilter = output<FilterValue>();
}
