import { useDispatch } from "./GlobalStateProvider";
import { useEffect } from "react";
import {
  apiDeleteNote,
  apiEditNote,
  apiGetNotes,
  apiNewNote,
} from "./api-functions";
import { Note } from "@poly/domain";

export const useLoadGlobalState = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "REQ_LIST" });
    apiGetNotes()
      .then((list) => dispatch({ type: "RES_LIST", payload: list }))
      .catch(() => dispatch({ type: "ERR_LIST" }));
  }, [dispatch]);
};

export const useDispatchEditAction = () => {
  const dispatch = useDispatch();

  return (note: Note) => {
    dispatch({ type: "REQ_EDIT" });
    return apiEditNote(note)
      .then((res) => dispatch({ type: "RES_EDIT", payload: res }))
      .catch(() => dispatch({ type: "ERR_EDIT" }));
  };
};

export const useDispatchDeleteAction = () => {
  const dispatch = useDispatch();

  return (id: Note["id"]) => {
    dispatch({ type: "REQ_DELETE" });
    return apiDeleteNote(id)
      .then((res) => dispatch({ type: "RES_DELETE", payload: res }))
      .catch(() => dispatch({ type: "ERR_DELETE" }));
  };
};

export const useDispatchNewAction = () => {
  const dispatch = useDispatch();

  return (note: Pick<Note, "text">) => {
    dispatch({ type: "REQ_NEW" });
    return apiNewNote(note)
      .then((res) => dispatch({ type: "RES_NEW", payload: res }))
      .catch(() => dispatch({ type: "ERR_NEW" }));
  };
};
