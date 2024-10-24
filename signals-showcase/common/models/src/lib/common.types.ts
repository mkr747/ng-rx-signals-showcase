import { Type } from "@angular/core";

export type UnwrapType<T> = T extends Type<infer R> ? R : never;
