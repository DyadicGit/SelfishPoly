import { FC, ReactNode } from "react";
import { KnownError } from "@poly/domain";

export type Q<T> = { type: T };
export type S<T, P> = { type: T; payload: P };
export type E<T> = { type: T; payload?: string | ErrorResponse };

export type FCC<P = {}> = FC<{ children?: ReactNode } & P>;

export class ErrorResponse extends Error {
  data: KnownError;
  constructor(json: any) {
    super("An known error in json form");
    this.data = json;
  }
}

export const resolve = async <T>(r: Response) => {
  let jsonResponse = await r.json();
  if (!r.ok) {
    throw new ErrorResponse(jsonResponse);
  }
  return jsonResponse as Promise<T>;
};
