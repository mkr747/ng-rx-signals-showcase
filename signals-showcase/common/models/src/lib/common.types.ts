import { Type } from "@angular/core";

export type UnwrapType<T> = T extends Type<infer P> ? P : never;
