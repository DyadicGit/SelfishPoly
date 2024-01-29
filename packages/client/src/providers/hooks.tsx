import { useDispatch } from "./GlobalStateProvider";
import { useEffect } from "react";
import { apiGetNotes } from "./api-functions";

export const useLoadGlobalState = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "REQ_LIST" });
    apiGetNotes()
      .then((list) => dispatch({ type: "RES_LIST", payload: list }))
      .catch(() => dispatch({ type: "ERR_LIST" }));
  }, [dispatch]);
};
