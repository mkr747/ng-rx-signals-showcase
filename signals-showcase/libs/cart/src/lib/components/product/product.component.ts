import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CartAction, CartActionType } from '../../models/cart.model';

@Component({
  selector: 'showcase-product',
  standalone: true,
  imports: [FormsModule, MatCardModule],
  templateUrl: './product.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  amount = signal(0);
  id = input.required<string>();
  header = input.required<string>();
  action = output<CartAction>();

  handleUpdateAmount(id: string, amount: number) {
    this.action.emit({
      type: CartActionType.ChangeAmount,
      payload: {
        id: id,
        updatedAmount: amount,
      },
    });
  }

  handleRemoveFromCart(id: string) {
    this.action.emit({
      type: CartActionType.RemoveFromCart,
      payload: id,
    });
  }

  handleSubmitCart(ids: string[]) {
    this.action.emit({
      type: CartActionType.SubmitCart,
      payload: ids,
    });
  }
}
