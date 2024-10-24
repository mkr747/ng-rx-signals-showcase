import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CartLocalStore } from './store/cart-local.store';
import { ProductComponent } from './components/product/product.component';

@Component({
  selector: 'showcase-cart',
  standalone: true,
  imports: [ProductComponent],
  providers: [CartLocalStore],
  templateUrl: './cart-root.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartRootComponent {
  cartLocalStore = inject(CartLocalStore);
}
