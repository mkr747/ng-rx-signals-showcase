import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from "@angular/core";
import { ProductDetails } from "@showcase/core-store";

@Component({
  selector: 'showcase-product-overview',
  standalone: true,
  imports: [],
  templateUrl: './product-overview.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductOverviewComponent {
  details = input.required<ProductDetails>();
}
