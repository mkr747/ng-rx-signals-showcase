import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from "@angular/core";
import { MatTableModule } from '@angular/material/table';
import { TableModel } from "../../models/log.model";

@Component({
  selector: 'showcase-table',
  standalone: true,
  imports: [
    MatTableModule
  ],
  templateUrl: './table.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  data = input.required<TableModel[]>();
  displayedColumns = ['header', 'content']
}
