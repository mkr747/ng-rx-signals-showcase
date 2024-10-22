import { ChangeDetectionStrategy, Component, input, output, signal, ViewEncapsulation } from "@angular/core";
import { FormsModule  } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { ProductAction, ProductActionType} from "../../models/product.models";
import { MatButtonModule } from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: 'showcase-product',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './product.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  id = input.required<string>();
  name = input.required<string>();
  price = input.required<number>();
  action = output<ProductAction>();

  amount = signal(0);

  handleAddAction(id: string, amount: number) {
    this.action.emit({
      type: ProductActionType.AddToCart,
      payload: {
        id: id,
        amount: amount
      }
    })
  }

  handleCheckDetails(id: string) {
    this.action.emit({
      type: ProductActionType.CheckDetails,
      payload: id,
    })
  }
}
