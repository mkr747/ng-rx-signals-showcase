import { signalStore } from "@ngrx/signals";
import { withFilterFeature } from "./features/filter.feature";
import { withTableFeature } from "./features/table.feature";

export const LogLocalStore = signalStore(
  withFilterFeature(),
  withTableFeature()
);
