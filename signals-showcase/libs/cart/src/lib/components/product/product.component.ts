import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CartAction, CartActionType } from '../../models/cart.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'showcase-product',
  standalone: true,
  imports: [    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule],
  templateUrl: './product.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  id = input.required<string>();
  name = input.required<string>();
  price = input.required<number>();
  amount = input.required<number>();
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
}
