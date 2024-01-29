import { FC, ReactNode } from 'react';

export type Q<T> = { type: T };
export type S<T, P> = { type: T; payload: P };
export type E<T> = { type: T; payload?: string };

export type F<P = {}> = FC<{ children?: ReactNode } & P>;

export const resolve = <T>(r: Response) => {
  if (!r.ok) throw Error(r.statusText);
  return r.json() as Promise<T>;
};
