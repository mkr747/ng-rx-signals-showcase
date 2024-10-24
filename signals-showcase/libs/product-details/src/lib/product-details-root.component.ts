import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ProductDetailsLocalStore } from './store/product-details-local.store';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';

@Component({
  selector: 'showcase-product-details',
  standalone: true,
  imports: [ProductOverviewComponent],
  providers: [ProductDetailsLocalStore],
  templateUrl: './product-details-root.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsRootComponent {
  productDetailsLocalStore = inject(ProductDetailsLocalStore);
}
