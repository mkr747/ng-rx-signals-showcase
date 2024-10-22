export enum ProductActionType {
  AddToCart,
  CheckDetails
}

export interface Order {
  id: string;
  amount: number;
}

export type AddAction = {
  type: ProductActionType.AddToCart,
  payload: Order
}

export type CheckDetailsAction = {
  type: ProductActionType.CheckDetails,
  payload: string
}

export type ProductAction = AddAction | CheckDetailsAction;
