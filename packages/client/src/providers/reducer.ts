import { E, Q, S } from "./utils";
import { Reducer } from "react";
import { Note } from "@poly/domain";

// Actions
type ReqListAction = Q<"REQ_LIST">;
type ResListAction = S<"RES_LIST", Note[]>;
type ErrListAction = E<"ERR_LIST">;
type ReqEditAction = Q<"REQ_EDIT">;
type ResEditAction = S<"RES_EDIT", Note[]>;
type ErrEditAction = E<"ERR_EDIT">;

export type Action =
  | ReqListAction
  | ResListAction
  | ErrListAction
  | ReqEditAction
  | ResEditAction
  | ErrEditAction;

export type GlobalState = {
  isLoading: boolean;
  notes: Note[];
  error: string | null;
};

export const reducer: Reducer<GlobalState, Action> = (
  state,
  action
): GlobalState => {
  switch (action.type) {
    case "REQ_LIST":
      return { ...state, isLoading: true };
    case "RES_LIST":
      return { ...state, isLoading: false, notes: action.payload };
    case "ERR_LIST":
      return {
        ...state,
        isLoading: false,
        error: action.payload || "ERR_LIST",
      };

    case "REQ_EDIT":
      return { ...state, isLoading: true };
    case "RES_EDIT":
      return { ...state, isLoading: false, notes: action.payload };
    case "ERR_EDIT":
      return {
        ...state,
        isLoading: false,
        error: action.payload || "ERR_EDIT",
      };

    default:
      return state;
  }
};
