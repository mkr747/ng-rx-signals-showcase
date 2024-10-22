import { data } from './data';
import { of } from 'rxjs';

export class ProductApi {
  get(id: string){
    return of(data.filter(x => x.id === id).map(x => ({
      id: x.id,
      name: x.name,
      effect: x.effect,
      sideEffects: x.sideEffects,
      characteristics: x.characteristics,
      time: x.time,
      difficulty: x.difficulty,
      ingredients: x.ingredients,
      inventors: x.inventors,
      manufacturer: x.manufacturer,
    })));
  }

  getAll() {
    return of(data.map(x => ({
      id: x.id,
      name: x.name,
      price: x.price
    })));
  }
}
