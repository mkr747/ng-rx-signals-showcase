import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartLocalStore } from './store/cart-local.store';

@Component({
  selector: 'showcase-cart',
  standalone: true,
  imports: [CommonModule],
  providers: [CartLocalStore],
  templateUrl: './cart-root.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartRootComponent {

}
