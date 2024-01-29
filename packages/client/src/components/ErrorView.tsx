import React from "react";
import { useGlobalState } from "../providers/GlobalStateProvider";

export const ErrorView = () => {
  const { error } = useGlobalState();

  return (
    <div>
      <h1>Something went wrong!</h1>
      {typeof error === "string" && <code>{error}</code>}
    </div>
  );
};
