import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { ProductDetails } from "@showcase/core-store";
import { MatListModule } from "@angular/material/list";
@Component({
  selector: 'showcase-product-overview',
  standalone: true,
  imports: [MatCardModule,MatListModule],
  templateUrl: './product-overview.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductOverviewComponent {
  details = input.required<ProductDetails>();
}
