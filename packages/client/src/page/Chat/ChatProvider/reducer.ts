import { Reducer } from "react";
import { ChatAction, Message } from "@poly/domain";

export const internalStateReducer: Reducer<Message[], ChatAction> = (
  state = [],
  action
) => {
  switch (action.type) {
    case "GREETINGS":
      return [action.payload, ...state];
    case "LOAD_HISTORY":
    case "TO_CLIENT":
    case "TO_SERVER":
      return state.concat(action.payload);
  }
};
