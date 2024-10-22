export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface ProductDetails {
  id: string;
  name: string;
  effect: string;
  sideEffects: string;
  characteristics: string;
  time: string;
  difficulty: string;
  ingredients: Ingredient[];
  inventors: Inventors[];
  manufacturer: string;
  price: number;
}

export interface Ingredient {
  id: string;
  name: string;
}

export interface Inventors {
  id: string;
  firstName: string;
  lastName: string;
}
