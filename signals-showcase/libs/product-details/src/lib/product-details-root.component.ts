import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsLocalStore } from './store/product-details-local.store';

@Component({
  selector: 'showcase-product-details',
  standalone: true,
  imports: [CommonModule],
  providers: [ProductDetailsLocalStore],
  templateUrl: './product-details-root.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsRootComponent {}
