import { ChangeDetectionStrategy, Component, input, output, signal, ViewEncapsulation } from "@angular/core";
import { FormsModule  } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { ProductAction, ProductActionType} from "../../models/product.models";

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
export class ProductComponent {
  id = input.required<string>();
  header = input.required<string>();
  action = output<ProductAction>();

  amount = signal(0);

  handleAddAction(id: number, amount: number) {
    this.action.emit({
      type: ProductActionType.AddToCart,
      payload: {
        id: id,
        amount: amount
      }
    })
  }

  handleCheckDetails(id: number) {
    this.action.emit({
      type: ProductActionType.CheckDetails,
      payload: id,
    })
  }
}
