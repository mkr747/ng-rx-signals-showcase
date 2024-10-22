import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { ProductListLocalStore } from './store/product-list-local.store';

@Component({
  selector: 'showcase-product-list',
  standalone: true,
  imports: [ProductComponent],
  providers: [ProductListLocalStore],
  templateUrl: './product-list-root.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListRootComponent {
  productLocalStore = inject(ProductListLocalStore);
}
