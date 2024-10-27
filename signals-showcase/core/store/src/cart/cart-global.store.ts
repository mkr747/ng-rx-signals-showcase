import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ProductOrder } from './cart.model';

export const CartGlobalStore = signalStore(
  withState<{
    data: {
      productOrders: ProductOrder[];
    };
    ui: {
      isLoading: boolean;
    };
  }>({
    data: {
      productOrders: [],
    },
    ui: {
      isLoading: false,
    },
  }),
  withMethods((store) => {
    // spaghetti code, highly not recommended
    const patchProductOrder = (productOrder: ProductOrder) => {
      const productOrders = store.data.productOrders().map((product) =>
        product.id === productOrder.id ? productOrder : product
      );

      patchState(store, (state) => ({
        data: { ...state.data, productOrders: productOrders },
      }));
    };

    const addProductOrder = (productOrder: ProductOrder) => {
      const existingProductOrder = store.data.productOrders().find((p) => p.id === productOrder.id)
      if (existingProductOrder) {
        const newProductOrder: ProductOrder = {
          ...productOrder,
          amount: existingProductOrder.amount + productOrder.amount
        };


        return patchProductOrder(newProductOrder);
      }

      patchState(store, (state) => ({
        data: {
          ...state.data,
          productOrders: [...state.data.productOrders, productOrder],
        },
      }));
    };

    const removeProduct = (id: string) => {
      patchState(store, (state) => ({
        data: { ...state.data, productOrders: state.data.productOrders.filter(x => x.id !== id)}
      }))
    }

    const updateIsLoading = (isLoading: boolean) => {
      patchState(store, (state) => ({ ui: { ...state.ui, isLoading } }));
    };

    return {
      removeProduct,
      patchProductOrder,
      addProductOrder,
      updateIsLoading,
    };
  })
);
