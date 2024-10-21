export enum ProductActionType {
  AddToCart,
  CheckDetails
}

export interface Order {
  id: number;
  amount: number;
}

export type AddAction = {
  type: ProductActionType.AddToCart,
  payload: Order
}

export type CheckDetailsAction = {
  type: ProductActionType.CheckDetails,
  payload: number
}

export type ProductAction = AddAction | CheckDetailsAction;

export interface ProductItem {
  id: string;
  header: string;
}
