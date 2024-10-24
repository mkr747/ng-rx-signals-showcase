export enum CartActionType {
  ChangeAmount,
  RemoveFromCart,
  SubmitCart
}

export interface ChangeAmountModel {
  id: string;
  updatedAmount: number
}

export type ChangeAmountAction = {
  type: CartActionType.ChangeAmount,
  payload: ChangeAmountModel
}

export type RemoveFromCartAction = {
  type: CartActionType.RemoveFromCart,
  payload: string;
}

export type SubmitCartAction = {
  type: CartActionType.SubmitCart,
  payload: string[];
}

export type CartAction = ChangeAmountAction | RemoveFromCartAction | SubmitCartAction;
