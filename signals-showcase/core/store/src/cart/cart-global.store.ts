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
    const patchProductOrder = (productOrder: ProductOrder) => {
      const productOrders = [...store.data.productOrders()];
      productOrders.map((product) =>
        product.id === productOrder.id ? productOrder : product
      );

      patchState(store, (state) => ({
        data: { ...state.data, productOrders },
      }));
    };

    const addProductOrder = (productOrder: ProductOrder) => {
      if (store.data.productOrders().find((p) => p.id === productOrder.id)) {
        patchProductOrder(productOrder);
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
