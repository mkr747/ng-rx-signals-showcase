import { ChangeDetectionStrategy, Component, input, output, signal, ViewEncapsulation } from "@angular/core";
import { FormsModule  } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { CartActions, CartActionType } from "../../models/cart.model";

@Component({
  selector: 'showcase-product',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
  ],
  templateUrl: './product.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  amount = signal(0);
  id = input.required<string>();
  header = input.required<string>();
  action = output<CartActions>();

  handleRemoveFromCart(id: number) {
    this.action.emit({
      type: CartActionType.RemoveFromCart,
      payload: id
    })
  }

  handleSubmitCart(ids: number[]) {
    this.action.emit({
      type: CartActionType.SubmitCart,
      payload: ids,
    })
  }
}
