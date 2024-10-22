export type ComponentType = 'Cart' | 'Product' | 'ProductList';

export interface Log {
  id: number;
  domain: ComponentType;
  log: string;
}
