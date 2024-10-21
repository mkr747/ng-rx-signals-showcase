import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ProductComponent } from './components/product/product.component';

@Component({
  selector: 'showcase-product-list',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './product-list-root.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  items = [];
}
