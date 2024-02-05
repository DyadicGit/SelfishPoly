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
type ReqDeleteAction = Q<"REQ_DELETE">;
type ResDeleteAction = S<"RES_DELETE", Note[]>;
type ErrDeleteAction = E<"ERR_DELETE">;
type ReqNewAction = Q<"REQ_NEW">;
type ResNewAction = S<"RES_NEW", Note[]>;
type ErrNewAction = E<"ERR_NEW">;

export type Action =
  | ReqListAction
  | ResListAction
  | ErrListAction
  | ReqEditAction
  | ResEditAction
  | ErrEditAction
  | ReqDeleteAction
  | ResDeleteAction
  | ErrDeleteAction
  | ReqNewAction
  | ResNewAction
  | ErrNewAction;

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
    case "REQ_EDIT":
    case "REQ_DELETE":
    case "REQ_NEW":
      return { ...state, isLoading: true };

    case "RES_LIST":
    case "RES_EDIT":
    case "RES_DELETE":
    case "RES_NEW":
      return { ...state, isLoading: false, notes: action.payload };

    case "ERR_LIST":
    case "ERR_EDIT":
    case "ERR_DELETE":
    case "ERR_NEW":
      return {
        ...state,
        isLoading: false,
        error: action.payload || "ERROR_WITHOUT_DESCRIPTION",
      };

    default:
      return state;
  }
};
