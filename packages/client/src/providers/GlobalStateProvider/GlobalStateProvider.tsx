import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { FCC } from '../utils';
import { Action, GlobalState, reducer } from './reducer';

export const initState: GlobalState = {
  isLoading: false,
  error: null,
  notes: [],
};

const GlobalStateCtx = createContext<{
  globalState: GlobalState;
  dispatch: Dispatch<Action>;
} | null>(null);

export const GlobalStateProvider: FCC = ({ children }) => {
  const [globalState, dispatch] = useReducer(reducer, initState);

  return <GlobalStateCtx.Provider value={{ globalState, dispatch }}>{children}</GlobalStateCtx.Provider>;
};

export const useGlobalState = () => {
  const ctx = useContext(GlobalStateCtx);
  if (ctx == null) throw Error("GState context isn't wrapped within Provider");
  return ctx.globalState;
};

export const useDispatch = () => {
  const ctx = useContext(GlobalStateCtx);
  if (ctx == null) throw Error("GState context isn't wrapped within Provider");
  return ctx.dispatch;
};
