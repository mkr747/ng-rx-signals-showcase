import { data } from './data';
import { of } from 'rxjs';

export class ProductApi {
  get(id: string){
    const product = data.find(x => x.id === id);

    return of(
      {
        id: product?.id ?? '',
        name: product?.name ?? '',
        effect: product?.effect ?? '-',
        sideEffects: product?.sideEffects ?? '-',
        characteristics: product?.characteristics ?? '-',
        time: product?.time ?? '-',
        difficulty: product?.difficulty ?? '-',
        ingredients: product?.ingredients ?? [],
        inventors: product?.inventors ?? [],
        manufacturer: product?.manufacturer ?? '-',
        price: product?.price ?? 0,
      });
  }

  getAll() {
    return of(data.map(x => ({
      id: x.id,
      name: x.name,
      price: x.price
    })));
  }
}
