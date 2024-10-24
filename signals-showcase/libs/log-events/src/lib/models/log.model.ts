import { ComponentType } from "@showcase/core-store";

export interface TableModel {
  header: string;
  content: string;
}

export interface FilterValue {
  name: ComponentType ;
  value: boolean;
}
