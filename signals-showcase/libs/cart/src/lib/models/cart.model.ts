export enum CartActionType {
  RemoveFromCart,
  SubmitCart
}

export type RemoveFromCartAction = {
  type: CartActionType.RemoveFromCart,
  payload: number;
}

export type SubmitCartAction = {
  type: CartActionType.SubmitCart,
  payload: number[];
}

export type CartAction = RemoveFromCartAction | SubmitCartAction;

export interface ProductOrder {
  id: string;
  amount: number;
  completed: boolean;
  price: number;
}
